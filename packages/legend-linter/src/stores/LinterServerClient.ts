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

import type { NetworkClient, PlainObject } from '@finos/legend-shared';
import { guaranteeNonNullable } from '@finos/legend-shared';
import type { LinterData } from '../models/LinterData';

export class LinterServerClient {
  private networkClient: NetworkClient;

  constructor(networkClient: NetworkClient) {
    this.networkClient = networkClient;
  }

  get baseUrl(): string {
    return guaranteeNonNullable(
      this.networkClient.baseUrl,
      `Linter server client has not been configured properly`,
    );
  }

  getData = (): Promise<PlainObject<LinterData>> =>
    this.networkClient.get(`${this.baseUrl}/data`);
}
