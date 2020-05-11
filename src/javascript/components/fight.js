import { controls } from '../../constants/controls';
import { reduceHealthIndicator } from './arena'

export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {
    const { PlayerOneAttack,
      PlayerTwoAttack,
      PlayerOneBlock,
      PlayerTwoBlock,
      PlayerOneCriticalHitCombination: PlayerOneCombo,
      PlayerTwoCriticalHitCombination: PlayerTwoCombo
    } = controls;
    const firstFighterInitialHealth = firstFighter.health;
    const secondFighterInitialHealth = secondFighter.health;
    let playerOneTimestamp = 0;
    let playerTwoTimestamp = 0;
    let pressed = new Set();

    const onKeyup = () => pressed.delete(event.code);

    const onKeydown = (event) => {
      let damage = 0;

      pressed.add(event.code);

      switch (event.code) {
        case PlayerOneAttack: {
          if (pressed.has(PlayerOneBlock)) return
          damage = pressed.has(PlayerTwoBlock) ? 0 : getDamage(firstFighter, secondFighter);
          secondFighter.health -= damage;
          reduceHealthIndicator(secondFighter, 'right', secondFighterInitialHealth)
          break;
        }
        case PlayerTwoAttack: {
          if (pressed.has(PlayerTwoBlock)) return
          damage = pressed.has(PlayerOneBlock) ? 0 : getDamage(secondFighter, firstFighter);
          firstFighter.health -= damage;
          reduceHealthIndicator(firstFighter, 'left', firstFighterInitialHealth)
          break;
        }
        case PlayerOneCombo.find(el => el === event.code): {
          const isPlayerOneCombo = PlayerOneCombo.every(el => pressed.has(el))
          if (isPlayerOneCombo && ((event.timeStamp - playerOneTimestamp) > 10000)) {
            playerOneTimestamp = event.timeStamp;
            damage = getDamage(firstFighter, secondFighter, true)
            secondFighter.health -= damage;
            reduceHealthIndicator(secondFighter, 'right', secondFighterInitialHealth)
          } else {
            return
          }
          break;
        }
        case PlayerTwoCombo.find(el => el === event.code): {
          const isPlayerTwoCombo = PlayerTwoCombo.every(el => pressed.has(el))
          if (isPlayerTwoCombo && ((event.timeStamp - playerTwoTimestamp) > 10000)) {
            playerTwoTimestamp = event.timeStamp;
            damage = getDamage(secondFighter, firstFighter, true)
            firstFighter.health -= damage;
            reduceHealthIndicator(firstFighter, 'left', firstFighterInitialHealth)
          } else {
            return
          }
          break;
        }
        default:
      }
      if (firstFighter.health <= 0) {
        window.removeEventListener('keydown', onKeydown)
        window.removeEventListener('keyup', onKeyup)
        resolve(secondFighter.name);
      } else if (secondFighter.health <= 0) {
        window.removeEventListener('keydown', onKeydown)
        window.removeEventListener('keyup', onKeyup)
        resolve(firstFighter.name)
      }
    }
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)
  })
}

export function getDamage(attacker, defender, isCriticalHit) {
  if (isCriticalHit) return attacker.attack * 2
  const damage = getHitPower(attacker) - getBlockPower(defender);

  return damage > 0 ? damage : 0
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  const power = fighter.attack * criticalHitChance;

  return power
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  const power = fighter.defense * dodgeChance;

  return power
}
