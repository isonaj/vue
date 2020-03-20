import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, total) {
    state.eventsTotal = total;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.createEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'Your event was created successfully!'
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creatinng your event: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
        throw error;
      });
  },
  loadEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data);
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count']);
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem loading events: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  loadEvent({ commit, dispatch, getters }, id) {
    var event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data);
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `There was a problem loading event ${id}: ${error.message}`
          };
          dispatch('notification/add', notification, { root: true });
        });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
