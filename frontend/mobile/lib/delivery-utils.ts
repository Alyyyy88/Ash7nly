/**
 * Get initials from a full name
 * @param fullName - The full name of the user
 * @returns The initials (e.g., "John Doe" -> "JD")
 */
export function getInitials(fullName: string): string {
  if (!fullName) return '';

  const names = fullName.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

/**
 * Get the next valid status in the delivery workflow
 * @param currentStatus - Current delivery status
 * @returns Next valid status or null if at the end
 */
export function getNextStatus(currentStatus: string): string | null {
  const STATUS_ORDER = ['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  if (currentIndex === -1 || currentIndex === STATUS_ORDER.length - 1) {
    return null;
  }

  return STATUS_ORDER[currentIndex + 1];
}

/**
 * Validate if a status transition is allowed
 * @param currentStatus - Current delivery status
 * @param newStatus - Desired new status
 * @returns true if transition is valid
 */
export function isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
  // FAILED can be set at any time
  if (newStatus === 'FAILED') return true;

  const STATUS_ORDER = ['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);
  const newIndex = STATUS_ORDER.indexOf(newStatus);

  if (currentIndex === -1 || newIndex === -1) return false;

  // Can only move to the next status in sequence
  return newIndex === currentIndex + 1;
}

/**
 * Format status for display
 * @param status - Raw status string
 * @returns Formatted status string
 */
export function formatStatus(status: string): string {
  return status
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

export function getNotesForDeliveryStatus(status: string): string {
  switch (status) {
    case 'ASSIGNED':
      return 'Driver has been assigned to the delivery.';
    case 'PICKED_UP':
      return 'Package has been picked up from the Merchant.';
    case 'IN_TRANSIT':
      return 'Package is currently in transit to the destination.';
    case 'DELIVERED':
      return 'Package has been successfully delivered to the recipient.';
    case 'FAILED':
      return 'Delivery attempt failed. Please contact support for more information.';
    default:
      return '';
  }
}
