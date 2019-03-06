class ArgsChecker {
  checkFile(arg) {
    if (arg === '' || arg === undefined) {
      console.error('No file specified.');
      process.exit();
    } else {
      let filename = arg.split('.')
      if (filename.lenght !== 2 && filename[1] !== 'json') {
        console.error('File must be json format.');
        process.exit();
      }
    }
    return true;
  }

  checkArg(arg, argname) {
    if (arg === '' || arg === undefined) {
      console.error(`No ${argname} specified.`);
      process.exit();
    } else if (!/^[a-z]+$/.test(arg)) {
      console.error(`Invalid ${argname} value.`);
      process.exit();
    }
    return true;
  }
}

module.exports = ArgsChecker;
