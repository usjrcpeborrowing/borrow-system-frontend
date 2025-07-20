export const Constants = {
  equipmentStatus: ['functional', 'defective', 'obsolete', 'lost', 'for_checkup', 'turned_over'],
  equipmentAvailability: ['available', 'borrowed', 'unreturned '],
  equipmentMatterType: ['solid', 'liquid', 'gas '],
  equipmentInventoryType: ['inventory', 'non_inventory'],
  borrowStatus: ['all', 'pending_faculty_confirmation', 'faculty_confirmed', 'faculty_rejected', 'oic_approved', 'oic_rejected', 'released', 'pending_return', 'returned'],
  userRoles: ['student', 'reads', 'oic', 'faculty', 'chairman', 'administrator'],
  departments: [
    'civil_engineering',
    'computer_engineering',
    'electrical_engineering',
    'electronics_and_communications_engineering',
    'industrial_engineering',
    'mechanical_engineering',
    'dmsep',
    'ecl',
  ],
};
