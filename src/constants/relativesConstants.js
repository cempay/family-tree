export const ERelativeRelationType = {
  father: 'father',
  mother: 'mother',
};

export const RelativeRelationTypeOptions = [
  {
    code: ERelativeRelationType.father,
    label: 'isFatherOf',
    sex: true,
  },
  {
    code: ERelativeRelationType.mother,
    label: 'isMotherOf',
    sex: false,
  },
];
