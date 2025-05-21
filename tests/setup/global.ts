const global = () => {
  process.env.TZ = 'Atlantic/Reykjavik'; // This one is quite similar to UTC+0 and does not have DST
};

export default global;
