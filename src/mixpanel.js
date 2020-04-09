import mixpanel from 'mixpanel-browser';
mixpanel.init('4db61817750ffb31f5365889d525bc83');

let env_check = process.env.NODE_ENV === 'production';

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;