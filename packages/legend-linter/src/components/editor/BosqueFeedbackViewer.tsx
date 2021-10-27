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

import { observer } from 'mobx-react-lite';
import type { BosqueFeedback } from '../../models/BosqueFeedback';

/**
 * The users of this need to justify their use case because blocking app disrupts the UX flow.
 * Of course there are legitimate use cases but please consult the team when you do so.
 * See https://material.io/components/dialogs#usage
 */
export const BosqueFeedbackViewer = observer(
  (props: { feedbackData: BosqueFeedback }) => {
    const { feedbackData } = props;

    if (!feedbackData.output.length) {
      return (
        <div className="feedback-viewer">
          <div className="panel__header">
            {
              <div className="panel__header__title">
                <div className="panel__header__title__label">
                  Bosque Feedback
                </div>
              </div>
            }
          </div>
          <div className="feedback-viewer__message feedback-viewer__message--success">
            No problem found!
          </div>
          <div className="feedback-viewer__message feedback-viewer__message--success">
            Bosque code: {feedbackData.bsqcode}
          </div>
        </div>
      );
    }
    return (
      <div className="feedback-viewer">
        <div className="panel__header">
          {
            <div className="panel__header__title">
              <div className="panel__header__title__label">Bosque Feedback</div>
            </div>
          }
        </div>
        <div className="feedback-viewer__message feedback-viewer__message--error">
          Problem(s) found!
        </div>
        {feedbackData.output.map((problem) => (
          <div
            key={problem.uuid}
            className="feedback-viewer__message feedback-viewer__message--error"
          >
            {problem.msg} [{problem.srclocation.startLine}:
            {problem.srclocation.startColumn}-{problem.srclocation.endLine}:
            {problem.srclocation.endColumn}]
          </div>
        ))}
        <div className="feedback-viewer__message feedback-viewer__message--error">
          Bosque code: {feedbackData.bsqcode}
        </div>
      </div>
    );
  },
);
