/**
 * DEVELOPER NOTES: Generic Fade Transition Function
 * 
 * The WWMM landing flow uses a centralized fade transition system
 * implemented in App.tsx as the `fadeTransition` function.
 * 
 * Function Signature:
 * -------------------
 * fadeTransition(
 *   nextScreen: Screen,
 *   fadeOutDuration: number = 800,
 *   fadeInDuration: number = 800
 * )
 * 
 * Parameters:
 * - nextScreen: The screen component to transition to
 * - fadeOutDuration: Time in milliseconds for current screen to fade out (default: 800ms)
 * - fadeInDuration: Time in milliseconds for next screen to fade in (default: 800ms)
 * 
 * How it works:
 * 1. Sets isTransitioning flag to prevent multiple simultaneous transitions
 * 2. Current screen receives 'fade-out' class and begins opacity transition
 * 3. After fadeOutDuration, the screen switches (DOM update)
 * 4. Next screen receives 'fade-in' class and begins opacity transition
 * 5. After fadeInDuration, isTransitioning flag is cleared
 * 
 * Usage Examples:
 * ---------------
 * 
 * // User-triggered transition (button click):
 * fadeTransition('next-screen', 800, 800)
 * 
 * // Auto-advance transition (setTimeout):
 * setTimeout(() => {
 *   fadeTransition('next-screen', 1000, 1200)
 * }, 4000)
 * 
 * // Quick transition:
 * fadeTransition('next-screen', 500, 500)
 * 
 * CSS Classes:
 * ------------
 * .fade-in: Animates opacity from 0 to 1 over 0.8s
 * .fade-out: Animates opacity from 1 to 0 over 0.8s
 * 
 * Implementation Notes:
 * ---------------------
 * - Each screen component receives isTransitioning prop to apply fade-out class
 * - Transition state prevents interaction during animation
 * - All screens are absolutely positioned for seamless crossfades
 * - Only one screen is rendered at a time (conditional rendering)
 * 
 * Customization:
 * --------------
 * To adjust transition timing for specific screens:
 * - Modify fadeOutDuration for how quickly current screen disappears
 * - Modify fadeInDuration for how quickly next screen appears
 * - Typical range: 300ms (fast) to 1500ms (slow, dramatic)
 */

// This is a documentation-only component
export default function DeveloperNotes() {
  return null;
}
