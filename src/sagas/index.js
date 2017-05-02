// @flow
import { fork } from "redux-saga/effects"
import { login, logout } from "./user"
import { querysmeta } from "./smeta"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(login),
    fork(logout),
    fork(querysmeta),
  ];
}
