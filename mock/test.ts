
export default {
  'GET /api/getrouters': {
    'routers': [{
      path: '/',
      routes: [{
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [{
            path: '/',
            redirect: '/bigdata',
          },
          {
            path: '/logon',
            name: 'logon',
            icon: 'upout',
            component: './LogonList/index',
            routes: [{
                path: '/logon/apply',
                name: 'apply',
                component: './LogonList/apply/apply'
    
              },
              {
                path: '/logon/approval',
                name: 'approval',
                component: './LogonList/approval/approval'
              }
            ]
          },
          {
            path: '/association',
            name: 'association',
            icon: 'Windows',
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
          {
            path: '/guide',
            name: 'guide',
            icon: 'solution',
            component: './GuideList/index',
          },
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
          {
            path: '/bigdata',
            name: 'bigdata',
            icon: 'Fund',
            component: './BigdataList/index'
          },
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
                path: '/setting/control',
                name: 'control',
                component: './SettingList/control/control.tsx',
              },
              {
                path: '/setting/person',
                name: 'person',
                component: './SettingList/person/person'
              },
              {
                path: '/setting/usergroup',
                name: 'usergroup',
                component: './SettingList/userGroup/usergroup'
              }
            ]
          },
          {
            component: './404'
          }
        ]
      }]
  }]
  }
}