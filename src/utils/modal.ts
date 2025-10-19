import { ref } from "vue";

type RegisteredTeleport = {
  [key: string]: {
    id: string;
    isOpen: boolean;
    close: () => void;
    open: () => void;
  };
};

export type TeleportType = {
  id: string;
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

/**
 * Class representing a TelePort (modal, sticky panel, ...)
 * Exposes functions to open and close the TelePort
 */
export class BaseTeleport implements TeleportType {
  id: string;
  isOpen: boolean;

  constructor(id: string) {
    this.id = id;
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }
}

export const defaultTelePort = new BaseTeleport("default");

/**
 * Object containing all registered teleports with their name as key
 * and their state (boolean) as value. The state indicates whether or not the teleport is open
 */
export const registeredTeleports = ref<RegisteredTeleport>({
  default: defaultTelePort,
});

/**
 * Register an additional teleport with the provided id
 * @param id - The id of the teleport. If the id already exists, the teleport status will be reset to false
 * @returns - id of the teleport
 */
export function registerTeleport(id: string): TeleportType {
  if (id !== "default") {
    if (!registeredTeleports.value[id]) {
      registeredTeleports.value[id] = new BaseTeleport(id);
    } else {
      registeredTeleports.value[id].close();
    }
    return registeredTeleports.value[id];
  }
  return registeredTeleports.value["default"];
}
