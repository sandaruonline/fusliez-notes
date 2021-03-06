import { DEFAULT_SETTINGS, NAMESPACE } from "utils/constants";
import {
  getIsColorBlind,
  getShowNames,
  resetSettings,
  setIsColorBlind,
  setShowNames,
  toggleIsColorBlind,
  toggleShowNames,
} from "store/slices/SettingsSlice";

import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "store";

export const SettingsMiddleWare: Middleware<unknown, RootState> = (store) => (
  next
) => (action) => {
  const state = store.getState();

  let showNames = getShowNames(state);
  let isColorBlind = getIsColorBlind(state);
  let edit = true;

  switch (action.type) {
    case setShowNames.type:
      showNames = action.payload;

      break;

    case toggleShowNames.type:
      showNames = !getShowNames(state);

      break;

    case setIsColorBlind.type:
      isColorBlind = action.payload;

      break;

    case toggleIsColorBlind.type:
      isColorBlind = !getIsColorBlind(state);

      break;

    case resetSettings.type:
      showNames = DEFAULT_SETTINGS.showNames;
      isColorBlind = DEFAULT_SETTINGS.isColorBlind;

      break;

    default:
      edit = false;
  }

  if (edit) {
    localStorage.setItem(
      `${NAMESPACE}settings`,
      JSON.stringify({
        showNames,

        isColorBlind,
      })
    );
  }

  return next(action);
};
