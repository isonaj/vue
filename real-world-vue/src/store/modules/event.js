import EventService from '@/services/EventService.js';

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
  createEvent({ commit }, event) {
    return EventService.createEvent(event).then(() => {
      commit('ADD_EVENT', event);
    });
  },
  loadEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data);
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count']);
      })
      .catch(error => {
        console.log('There was an error: ' + error.response);
      });
  },
  loadEvent({ commit, getters }, id) {
    var event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data);
        })
        .catch(error => {
          console.log('Error reponse: ', error.response);
        });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
