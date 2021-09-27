const commandSplitter = (command: string): Array<string> => {
  return command.split(" ").filter((content) => content !== "");
};
export default commandSplitter;
