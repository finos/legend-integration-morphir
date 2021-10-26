/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { action, flowResult, makeAutoObservable, observable } from 'mobx';
import { deserialize } from 'serializr';
import type {
  ActionAlertInfo,
  ApplicationStore,
  BlockingAlertInfo,
} from '@finos/legend-application';
import { useApplicationStore } from '@finos/legend-application';
import type { GeneratorFn } from '@finos/legend-shared';
import {
  NetworkClient,
  ActionState,
  assertErrorThrown,
  guaranteeNonNullable,
} from '@finos/legend-shared';
import type { LegendLinterConfig } from '../application/LegendLinterConfig';
import { LinterServerClient } from './LinterServerClient';
import { BosqueServerClient } from './BosqueServerClient';
import { LinterData } from '../models/LinterData';
import { BosqueFeedback } from '../models/BosqueFeedback';

export class EditorStore {
  applicationStore: ApplicationStore<LegendLinterConfig>;
  linterClient: LinterServerClient;
  bosqueClient: BosqueServerClient;
  isInExpandedMode = false;
  initState = ActionState.create();
  pureCode?: string | undefined;
  morphirIR?: string | undefined;
  feedbackData?: BosqueFeedback | undefined;

  constructor(applicationStore: ApplicationStore<LegendLinterConfig>) {
    makeAutoObservable(this, {
      morphirIR: observable.ref,
      setBlockingAlert: action,
      setExpandedMode: action,
      setActionAltertInfo: action,
    });
    this.applicationStore = applicationStore;
    this.linterClient = new LinterServerClient(
      new NetworkClient({
        baseUrl: this.applicationStore.config.linterServerUrl,
      }),
    );
    this.bosqueClient = new BosqueServerClient(
      new NetworkClient({
        baseUrl: this.applicationStore.config.bosqueServerUrl,
      }),
    );
  }

  setExpandedMode(val: boolean): void {
    this.isInExpandedMode = val;
  }
  setActionAltertInfo(alertInfo: ActionAlertInfo | undefined): void {
    this.applicationStore.setActionAltertInfo(alertInfo);
  }
  setBlockingAlert(alertInfo: BlockingAlertInfo | undefined): void {
    this.applicationStore.setBlockingAlert(alertInfo);
  }

  cleanUp(): void {
    // dismiss all the alerts as these are parts of application, if we don't do this, we might
    // end up blocking other parts of the app
    // e.g. trying going to an unknown workspace, we will be redirected to the home page
    // but the blocking alert for not-found workspace will still block the app
    this.setBlockingAlert(undefined);
    this.setActionAltertInfo(undefined);
  }

  *initialize(): GeneratorFn<void> {
    if (!this.initState.isInInitialState) {
      this.applicationStore.notifyIllegalState(
        'Editor store is re-initialized',
      );
      return;
    }
    try {
      const data = deserialize(
        LinterData,
        yield flowResult(this.linterClient.getData()),
      );
      this.pureCode = data.pureCode;
      this.morphirIR = data.morphirIR;
      const parsedMorphirIR = JSON.parse(this.morphirIR);
      const feedbackData = deserialize(
        BosqueFeedback,
        yield flowResult(this.bosqueClient.getFeedback(parsedMorphirIR)),
      );
      this.feedbackData = feedbackData;
      this.initState.pass();
    } catch (error) {
      assertErrorThrown(error);
      this.applicationStore.notifyError(error);
      this.initState.fail();
      this.setBlockingAlert({
        message: 'Failed to initialize',
        prompt: 'Make sure the data has been posted to the server',
      });
    }
  }
}

const EditorStoreContext = createContext<EditorStore | undefined>(undefined);

export const EditorStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const applicationStore = useApplicationStore<LegendLinterConfig>();
  const store = useLocalObservable(() => new EditorStore(applicationStore));
  return (
    <EditorStoreContext.Provider value={store}>
      {children}
    </EditorStoreContext.Provider>
  );
};

export const useEditorStore = (): EditorStore =>
  guaranteeNonNullable(
    useContext(EditorStoreContext),
    'useEditorStore() hook must be used inside EditorStore context provider',
  );
