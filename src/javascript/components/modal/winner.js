import { showModal } from './modal'
import { createElement } from '../../helpers/domHelper'

export function showWinnerModal(name) {
  const bodyElement = createElement({ tagName: 'div', className: 'modal-body' })

  bodyElement.innerHTML = `${name} is a winner!`;

  showModal({ title: `GAME OVER`, bodyElement })
}
