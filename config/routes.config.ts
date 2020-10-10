// 路由规则

export default [{
  path: '/',
  // component: '../layouts/SecurityLayout',
  routes: [{
    path: '/',
    component: '../layouts/BasicLayout',
    // authority: ['admin', 'user'],
    routes: [{
        path: '/',
        redirect: '/bigdata',
      },
      // 注册登记 router
      {
        path: '/logon',
        name: 'logon',
        icon: 'edit',
        component: './LogonList/index',
        routes: [{
            path: '/logon/apply',
            name: 'apply',
            component: './LogonList/apply/apply'

          },
          {
            path: '/logon/applylist',
            name: 'applylist',
            component: './LogonList/applyList/applyList'
          },
          {
            path: '/logon/approval',
            name: 'approval',
            component: './LogonList/approval/approval'
          }
        ]
      },
      // 社团管理 router
      {
        path: '/association',
        name: 'association',
        icon: 'InfoCircle',
        component: './AssociationList/index',
        routes: [{
            path: './association/info',
            name: 'info',
            component: './AssociationList/info/info'
          },
          {
            path: './association/news',
            name: 'news',
            component: './AssociationList/news/news'
          },
          {
            path: './association/list',
            name: 'list',
            component: './AssociationList/list/list'
          },
          {
            path: './associatin/member',
            name: 'member',
            component: './AssociationList/member/member'
          },
          {
            path: './association/upgrade',
            name: 'upgrade',
            component: './AssociationList/upgrade/upgrade'
          },
          {
            path: './association/delete',
            name: 'delete',
            component: './AssociationList/delete/delete'
          },
          {
            path: './association/party',
            name: 'party',
            component: './AssociationList/party/party'
          }
        ]
      },
      // 成员管理 router  
      {
        path: '/member',
        name: 'member',
        icon: 'team',
        component: './MemberList/index',
        routes: [{
            path: '/member/member',
            name: 'memberControl',
            component: './MemberList/member/member'
          },
          {
            path: '/member/recruit',
            name: 'recruit',
            component: './MemberList/recruit/recruit'
          }
        ]
      },
      // 考核管理 router
      {
        path: '/examine',
        name: 'examine',
        icon: 'audit',
        component: './ExamineList/index',
        routes: [{
            path: '/examine/association',
            name: 'association',
            component: './ExamineList/association/association'
          },
          {
            path: '/examine/head',
            name: 'head',
            component: './ExamineList/head/head'

          },
          {
            path: '/examine/teacher',
            name: 'teacher',
            component: './ExamineList/teacher/teacher'
          }
        ]
      },
      // 活动管理 router
      {
        path: '/activity',
        name: 'activity',
        icon: 'smile',
        component: './ActivityList/index',
        routes: [{
            path: '/activity/publish',
            name: 'publish',
            component: './ActivityList/publish/publish'
          },
          {
            path: '/activity/approval',
            name: 'approval',
            component: './ActivityList/approval/approval'
          },
          {
            path: '/activity/control',
            name: 'control',
            component: './ActivityList/control/control'
          }
        ]
      },
      // 新媒体管理 router
      {
        path: '/media',
        name: 'media',
        icon: 'VideoCamera',
        component: './MediaList/index',
        routes: [{
            path: '/media/register',
            name: 'register',
            component: './MediaList/register/register'
          },
          {
            path: '/media/applypublish',
            name: 'applyPublish',
            component: './MediaList/applyPublish/applyPublish'
          },
          {
            path: '/media/approval',
            name: 'approval',
            component: './MediaList/approval/approval'
          },
          {
            path: '/media/search',
            name: 'search',
            component: './MediaList/search/search'
          }
        ]
      },
      // 经费管理 router
      {
        path: '/outlay',
        name: 'outlay',
        icon: 'AccountBook',
        component: './OutlayList/index',
        routes: [{
            path: '/outlay/income',
            name: 'income',
            component: './OutlayList/income/income'
          },
          {
            path: '/outlay/paycontrol',
            name: 'payControl',
            component: './OutlayList/payControl/payControl'
          },
          {
            path: '/outlay/approval',
            name: 'approval',
            component: './OutlayList/approval/approval'
          },
          {
            path: '/outlay/payfor',
            name: 'payfor',
            component: './OutlayList/payfor/payfor'
          }
        ]
      },
      // 个人页
      {
        path: '/user',
        name: 'user',
        icon: 'user',
        component: './UserList/index',
        routes: [{
            path: '/user/individual',
            name: 'individual',
            component: './UserList/individual/individual'
          },
          {
            path: 'user/setting',
            name: 'setting',
            component: './UserList/setting/setting'
          }
        ]
      },
      // 社团大数据 router
      {
        path: '/bigdata',
        name: 'bigdata',
        icon: 'Fund',
        component: './BigdataList/index'
      },
      // 系统设置 router
      {
        path: '/setting',
        name: 'setting',
        icon: 'setting',
        component: './SettingList/index',
        routes: [{
            path: '/setting/base',
            name: 'base',
            component: './SettingList/base/base'
          },
          {
            path: '/setting/department',
            name: 'department',
            component: './SettingList/department/department.tsx',
          },
          {
            path: '/setting/category',
            name: 'category',
            component: './SettingList/category/category.tsx',
          },
          {
            path: '/setting/control',
            name: 'control',
            component: './SettingList/control/control.tsx',
          },
          {
            path: '/setting/student',
            name: 'student',
            component: './SettingList/student/student'
          },
          {
            path: '/setting/worker',
            name: 'worker',
            component: './SettingList/worker/worker'
          },
          {
            path: '/setting/authorization',
            name: 'authorization',
            component: './SettingList/authorization/authorization'
          },
          {
            path: '/setting/usergroup',
            name: 'usergroup',
            component: './SettingList/userGroup/userGroup.tsx',
          }
        ]
      },
      {
        component: './404'
      }
    ]
  }]
}]