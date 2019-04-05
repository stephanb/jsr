import { EventHandler } from '~/EventHandler/EventHandler';
import { Renderer } from '~/Renderer/Renderer';
import { TValueRatio } from '~/types';
import { throttle } from '~/helpers/timing';

/**
 * Handles setting values (via EventHandler) based on moved mouse.
 *
 * @param index - index of item in values, that should be updated
 * @param valuesCount - number of all values that can be set
 * @param events - EventHandler instance
 * @param renderer - Renderer instance
 */
export function handleMove (index: number, valuesCount: number, events: EventHandler, renderer: Renderer): void {
  // Get root rect
  const rect: ClientRect = renderer.root.element.getBoundingClientRect();
  const values: TValueRatio[] = (new Array(valuesCount)).fill(null);

  // Handle mouse move (count value and trigger update)
  const handleMouseMove = throttle(10, (moveEvent: MouseEvent) => {
    const moveX: number = moveEvent.clientX;
    const moveRelative: number = moveX - rect.left;
    const ratio: TValueRatio = moveRelative / rect.width as TValueRatio;
    values[index] = ratio;

    events.trigger(null, events.event.EValueChange, {
      ratioValues: values,
    });
  });

  // Handle mouse up (unbind any events)
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Add events
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}
