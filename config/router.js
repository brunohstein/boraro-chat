var router = new geddy.RegExpRouter();

router.get('/').to('main.index');

router.get('/ui').to('main.ui');

router.get('/login').to('main.login');
router.get('/logout').to('main.logout');
router.post('/auth/local').to('auth.local');

router.get('/users(.:format)').to('users.index');
router.get('/users/add(.:format)').to('users.add');
router.get('/:user(.:format)').to('users.show');
router.get('/:user/edit(.:format)').to('users.edit');
router.post('/users(.:format)').to('users.create');
router.put('/:user(.:format)').to('users.update');
router.del('/:user(.:format)').to('rooms.destroy');

router.get('/:user/rooms(.:format)').to('rooms.index');
router.get('/:user/rooms/add(.:format)').to('rooms.add');
router.get('/:user/:room(.:format)').to('rooms.show');
router.get('/:user/:room/edit(.:format)').to('rooms.edit');
router.post('/:user/rooms(.:format)').to('rooms.create');
router.put('/:user/:room(.:format)').to('rooms.update');
router.del('/:user/:room(.:format)').to('rooms.destroy');

router.post('/:user/:room(.:format)').to('messages.create');

exports.router = router;
