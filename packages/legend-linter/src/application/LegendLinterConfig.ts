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

import {
  assertNonNullable,
  guaranteeNonEmptyString,
} from '@finos/legend-shared';
import type {
  LegendApplicationConfigurationData,
  LegendApplicationVersionData,
} from '@finos/legend-application';
import { LegendApplicationConfig } from '@finos/legend-application';

export interface LegendLinterConfigData
  extends LegendApplicationConfigurationData {
  appName: string;
  env: string;
  linter: { url: string };
  bosque: { url: string };
}

export class LegendLinterConfig extends LegendApplicationConfig {
  readonly linterServerUrl: string;
  readonly bosqueServerUrl: string;

  constructor(
    configData: LegendLinterConfigData,
    versionData: LegendApplicationVersionData,
    baseUrl: string,
  ) {
    super(configData, versionData, baseUrl);

    assertNonNullable(
      configData.linter,
      `Application configuration failure: 'linter' field is missing`,
    );
    this.linterServerUrl = guaranteeNonEmptyString(
      configData.linter.url,
      `Application configuration failure: 'linter.url' field is missing or empty`,
    );

    assertNonNullable(
      configData.bosque,
      `Application configuration failure: 'bosque' field is missing`,
    );
    this.bosqueServerUrl = guaranteeNonEmptyString(
      configData.bosque.url,
      `Application configuration failure: 'bosque.url' field is missing or empty`,
    );
  }
}
