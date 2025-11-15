process.on('unhandledRejection', (err) => {
  console.error('Detected unhandled rejection:');
  if (err && err.stack) {
    console.error(err.stack);
  } else {
    console.error(err);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Detected uncaught exception:');
  if (err && err.stack) {
    console.error(err.stack);
  } else {
    console.error(err);
  }
});
