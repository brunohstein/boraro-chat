var router = new geddy.RegExpRouter();

router.get('/').to('main.index');

router.get('/ui').to('main.ui');

router.get('/login').to('main.login');
router.get('/logout').to('main.logout');
router.post('/auth/local').to('auth.local');

router.get('/users').to('users.index');
router.get('/users/add').to('users.add');
router.get('/:user').to('users.show');
router.get('/:user/edit').to('users.edit');
router.post('/users').to('users.create');
router.put('/:user').to('users.update');
router.del('/:user').to('rooms.destroy');

router.get('/:user/rooms').to('rooms.index');
router.get('/:user/rooms/add').to('rooms.add');
router.get('/:user/:room').to('rooms.show');
router.get('/:user/:room/edit').to('rooms.edit');
router.post('/:user/rooms').to('rooms.create');
router.put('/:user/:room').to('rooms.update');
router.del('/:user/:room').to('rooms.destroy');

router.post('/:user/:room').to('messages.create');

exports.router = router;
