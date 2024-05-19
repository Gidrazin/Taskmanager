const getStatus = (isReport: boolean, isPerformer: boolean) => {
    if (isReport) {
      return "done";
    } else if (isPerformer) {
      return "inProgress";
    } else {
      return "announced";
    }
}

export {getStatus}