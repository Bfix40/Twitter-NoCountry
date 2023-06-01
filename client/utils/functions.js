/**
 * Transition Animation for Components
 * @param {String} selector your css class or id for identify your html block example ".myblock or #myblock"
 * @param {String} entering your css class entrance animation to be applied
 * @param {String} leaving your css class exiting animation to be applied
 */

export function BlockTransition (selector, entering, leaving) {
  const block = document.querySelector(selector);

  if (!block) {
    return null;
  }

  function handleOutsideClick (event) {
    if (!block.contains(event.target) && !document.querySelector('.btn:not(.btn *)').contains(event.target)) {
      document.body.removeEventListener('click', handleOutsideClick);
      block.classList.remove(entering);
      block.classList.add(leaving);
      setTimeout(() => {
        block.classList.add('hidden');
      }, 300)
    }
  }

  if (!block.classList.contains(entering)) {
    block.classList.remove('hidden');
    block.classList.remove(leaving);
    block.classList.add(entering);
    document.addEventListener('click', handleOutsideClick);
  } else {
    block.classList.remove(entering);
    block.classList.add(leaving);
    setTimeout(() => {
      block.classList.add('hidden');
    }, 300);
    document.body.removeEventListener('click', handleOutsideClick);
  }
}
