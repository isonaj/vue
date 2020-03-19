import Vue from 'vue';
import Vuex from 'vuex';

import EventService from '@/services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: '123abc', name: 'Anthony Ison' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    eventsTotal: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total;
    }
  },
  actions: {
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
    }
  },
  modules: {},
  getters: {
    getEventById: state => id => {
      return state.events.filter(event => event.id === id);
    }
  }
});
