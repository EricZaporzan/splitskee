import m from 'mithril';

const active = current => (current === m.route.get() ? 'active' : '');

const Layout = {
  view(vnode) {
    return m('.container', [
      m('header', [
        m('a', { class: active('/'), href: '/', oncreate: m.route.link }, 'Counter'),
        m('a', { class: active('/todo'), href: '/todo', oncreate: m.route.link }, 'Todo'),
      ]),
      vnode.children,
    ]);
  },
};

export default Layout;
