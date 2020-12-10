const cleanPackageName = (fullName: string) =>
  fullName.split('/')[1] || fullName;
export default cleanPackageName;
