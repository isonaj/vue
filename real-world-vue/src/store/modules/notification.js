export const namespaced = true;

export const state = {
  notifications: []
};

let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    });
  },
  DELETE(state, notification) {
    state.notifications = state.notifications.filter(
      n => n.id !== notification.id
    );
  }
};

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification);
  },
  remove({ commit }, notification) {
    commit('DELETE', notification);
  }
};
