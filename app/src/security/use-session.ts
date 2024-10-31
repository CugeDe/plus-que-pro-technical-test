import * as React from 'react';

import { SessionContext } from './session-context';

const useSession = () => React.useContext(SessionContext);

export default useSession;
