import {AnyAction, ThunkAction} from "@reduxjs/toolkit";

export type ThunkType = ThunkAction<Promise<void>, {}, {}, AnyAction>