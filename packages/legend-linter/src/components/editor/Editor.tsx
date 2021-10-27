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

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { EditorStoreProvider, useEditorStore } from '../../stores/EditorStore';
import { StatusBar } from './StatusBar';
import { flowResult } from 'mobx';
import {
  EDITOR_LANGUAGE,
  TextInputEditor,
  useApplicationStore,
} from '@finos/legend-application';
import {
  clsx,
  ResizablePanelSplitterLine,
  ResizablePanel,
  ResizablePanelGroup,
  ResizablePanelSplitter,
  BlankPanelContent,
  PanelLoadingIndicator,
} from '@finos/legend-art';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BosqueFeedbackViewer } from './BosqueFeedbackViewer';
import { PureCodeViewer } from './PureCodeViewer';

export const EditorInner = observer(() => {
  const editorStore = useEditorStore();
  const applicationStore = useApplicationStore();

  // Cleanup the editor
  useEffect(
    () => (): void => {
      editorStore.cleanUp();
    },
    [editorStore],
  );

  // Initialize the app
  useEffect(() => {
    flowResult(editorStore.initialize()).catch(
      applicationStore.alertIllegalUnhandledError,
    );
  }, [editorStore, applicationStore]);

  const editable = editorStore.initState.hasSucceeded;

  return (
    <div className="editor">
      <div className="editor__body">
        <div className="editor__content-container">
          <div
            className={clsx('editor__content', {
              'editor__content--expanded': editorStore.isInExpandedMode,
            })}
          >
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel minSize={200}>
                <ResizablePanelGroup orientation="horizontal">
                  <ResizablePanel minSize={500}>
                    <PanelLoadingIndicator
                      isLoading={editorStore.initState.isInProgress}
                    />
                    <PureCodeViewer />
                  </ResizablePanel>
                  <ResizablePanelSplitter>
                    <ResizablePanelSplitterLine color="var(--color-dark-grey-250)" />
                  </ResizablePanelSplitter>
                  <ResizablePanel>
                    <PanelLoadingIndicator
                      isLoading={editorStore.initState.isInProgress}
                    />
                    {editorStore.feedbackData ? (
                      <BosqueFeedbackViewer
                        feedbackData={editorStore.feedbackData}
                      />
                    ) : (
                      <BlankPanelContent>
                        No feedback available
                      </BlankPanelContent>
                    )}
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizablePanelSplitter>
                <ResizablePanelSplitterLine color="var(--color-dark-grey-250)" />
              </ResizablePanelSplitter>
              <ResizablePanel>
                <PanelLoadingIndicator
                  isLoading={editorStore.initState.isInProgress}
                />
                <div className="panel__header">
                  {
                    <div className="panel__header__title">
                      <div className="panel__header__title__label">
                        Morphir IR
                      </div>
                    </div>
                  }
                </div>
                <div className="panel__content edit-panel__content edit-panel__content--headless">
                  <TextInputEditor
                    inputValue={
                      JSON.stringify(
                        JSON.parse(editorStore.morphirIR ?? '{}'),
                        null,
                        2,
                      ) ?? '{}'
                    }
                    language={EDITOR_LANGUAGE.JSON}
                    isReadOnly={true}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
      <StatusBar actionsDisabled={!editable} />
    </div>
  );
});

export const Editor: React.FC = () => (
  <EditorStoreProvider>
    <DndProvider backend={HTML5Backend}>
      <EditorInner />
    </DndProvider>
  </EditorStoreProvider>
);
