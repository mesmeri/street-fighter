import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  if (!fighter) {
    return
  }
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  const imgElement = createFighterImage(fighter);
  const infoElement = createFighterInfo(fighter);

  fighterElement.append(imgElement, infoElement);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

export function createFighterInfo(fighter) {
  const { name, health, attack, defense } = fighter;
  const wrapperElement = createElement({ tagName: 'div', className: 'fighter-preview___info'});
  const nameElement = createElement({ tagName: 'p', className: 'fighter-preview___characteristic' });
  const healthElement = createElement({ tagName: 'p', className: 'fighter-preview___characteristic' });
  const attackElement = createElement({ tagName: 'p', className: 'fighter-preview___characteristic' });
  const defenseElement = createElement({ tagName: 'p', className: 'fighter-preview___characteristic' });

  nameElement.innerText = `Name: ${name}`;
  healthElement.innerText = `Health: ${health}`;
  attackElement.innerText = `Attack: ${attack}`;
  defenseElement.innerText = `Defense: ${defense}`;

  wrapperElement.append(nameElement, healthElement, attackElement, defenseElement);

  return wrapperElement;
}
