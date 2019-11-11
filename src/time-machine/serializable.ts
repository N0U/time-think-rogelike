export default interface Serializable {
  serialize(): any;
  deserialize(o: any);
}
