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
import { FaRegWindowMaximize } from 'react-icons/fa';
import { useEditorStore } from '../../stores/EditorStore';
import { clsx } from '@finos/legend-art';

export const StatusBar = observer((props: { actionsDisabled: boolean }) => {
  const editorStore = useEditorStore();

  const toggleExpandMode = (): void =>
    editorStore.setExpandedMode(!editorStore.isInExpandedMode);

  return (
    <div className={clsx('editor__status-bar')}>
      <div className="editor__status-bar__left">
        <div className="editor__status-bar__workspace"></div>
      </div>
      <div className="editor__status-bar__right">
        <button
          className={clsx(
            'editor__status-bar__action editor__status-bar__action__toggler',
            {
              'editor__status-bar__action__toggler--active':
                editorStore.isInExpandedMode,
            },
          )}
          onClick={toggleExpandMode}
          tabIndex={-1}
          title="Maximize/Minimize"
        >
          <FaRegWindowMaximize />
        </button>
      </div>
    </div>
  );
});
