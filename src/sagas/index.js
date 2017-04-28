// @flow
import { fork } from "redux-saga/effects"
import counterSaga from "./counter"
import { login, logout } from "./user"
import { queryDomains } from "./domain"
import { queryAuctions } from "./auction"
import { querysmeta } from "./smeta"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(counterSaga),
    fork(login),
    fork(logout),
    fork(queryDomains),
    fork(queryAuctions),
    fork(querysmeta),
  ];
}
