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

import { SourceInformation } from '@finos/legend-graph';
import { uuid } from '@finos/legend-shared';
import {
  createModelSchema,
  custom,
  list,
  object,
  primitive,
  SKIP,
} from 'serializr';

export class BosqueFeedbackOutput {
  uuid = uuid();
  msg!: string;
  srclocation!: SourceInformation;
}

createModelSchema(BosqueFeedbackOutput, {
  msg: primitive(),
  srclocation: custom(
    () => SKIP,
    (value) => {
      const sourceInformation = new SourceInformation(
        value[1][1],
        value[2][1],
        value[3][1],
        value[4][1],
        value[5][1],
      );
      return sourceInformation;
    },
  ),
});

export class BosqueFeedback {
  output: BosqueFeedbackOutput[] = [];
  bsqcode: string[] = [];
}

createModelSchema(BosqueFeedback, {
  output: list(object(BosqueFeedbackOutput)),
  bsqcode: primitive(),
});
