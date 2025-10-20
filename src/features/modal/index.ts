/**
 * Modal Feature
 *
 * Provides modal management functionality including:
 * - Modal state management with Pinia
 * - Z-index stacking for multiple modals
 * - Composable for easy modal integration
 *
 * @example
 * ```ts
 * import { useModalStore } from '@/features/modal';
 *
 * const modalStore = useModalStore();
 * modalStore.open('my-modal');
 * ```
 */

export { useModalStore } from "./composables/useModalStore";

