import { useState } from "react";

import { checkOptionalValues } from "@static/functions";

/**This hook eases the use of the `CuteModal` by avoiding any chance the undesired behavior
 * detailed in it's docs.
 *
 * **IMPORTANT**: This hook is NOT NECESSARY AT ALL to use the CuteModal, it only makes it
 *  more intuitive with easier logic.
 *
 * ### Use
 *
 * ```
 * function Component(){
 *   const modal = useModalState();
 *
 *   function someHandler(){
 *     modal.open({ ...successProps }, { success: true });
 *   }
 *
 *   function anotherHandler(){
 *     moda.open({ ...errorProps });
 *   }
 *
 *   //...
 *
 *    return (
 *      //...some markup
 *
 *      <CuteModal {...modal.cuteModalProps} >
 *        { modal.success
 *            ? <SuccessContent {...modal.childrenProps} />
 *            : <ErrorContent {...modal.childrenProps} />
 *        }
 *      </CuteModal>
 *    )
 * }
 * ```
 *
 * And that's it.
 * - Just spread the `cuteModalProps` straight to the `CuteModal` and the `childrenProps` straight to the Content.
 * - Use `open` to display the modal, passing it any Content props as 1st param, or values to control the Content as 2nd param (they shall be used like `modal.configValue`).
 * - Access `closeModal` from within any of the children Components.
 *
 * **Important**: This hook hides the `finished` and `reason` params given by the `onClose` callback of the `CuteModal`, so they can't be used. For that level of need, this hook can't be used.
 *
 * It might look boilerplate on paper here, but it avoids undesired behavior and is more intuitive and readable.
 */
function useModalState() {
  const [visible, setVisible] = useState(false);
  const [childrenProps, setChildrenProps] = useState({});
  const [config, setConfig] = useState({});

  function open(childrenProps, config) {
    checkOptionalValues([
      { childrenData: childrenProps, type: "object" },
      { config, type: "object" },
    ]);

    setVisible(true);

    setChildrenProps(childrenProps || {});
    setConfig(config || {});
  }

  function close(finished) {
    if (!finished) setVisible(false);
  }

  return {
    /**Opens the modal with some data for the children. Both are replaced by empty objects if not specified
     * @param childrenProps Props for the Modal Content.
     * @param config Any values used to control the Modal Content rendering. */
    open,
    /**Closes the modal */
    close,

    /**Just spread this on `<CuteModal />` */
    cuteModalProps: {
      onClose: close,
      visible,
    },

    /**Just spread this on the Modal's children. It already comes with `closeModal` in it. */
    childrenProps: childrenProps
      ? { ...childrenProps, closeModal: close }
      : { closeModal: close },

    ...config,
  };
}

export default useModalState;
