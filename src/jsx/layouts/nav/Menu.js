export const MenuList = [
    //Dashboard
    {
        title: 'Home',
        role: ["user","admin"],
        classsChange: 'mm-collapse',		
        iconStyle: <i className="flaticon-381-networking"></i>,
        content: [
            {
                title: 'Dashboard',
                to: 'dashboard',					
            },    
        ],
    },
    
    {
        title:'Calon Peserta',
        role: ["user","admin"],
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-notepad"></i>,
        content : [
            {
                title:'Calon Peserta',
                to: 'checking-calon-peserta',
            },
            {
                title:'Alumni',
                to: 'alumni',
            },
        ]
    },
    {
        title: 'Aspirasi & Pengaduan',
        role: ["user","admin"],
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-television"></i>,
        content: [
            {
                title: 'Daftar Aspirasi dan Pengaduan',
                to: 'pengaduan-aspirasi'
            },
        ],
    },
    {
        title: 'Usulan Pesera',
        role: ["user","admin"],
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-television"></i>,
        content: [
            {
                title: 'Daftar Usulan Peserta',
                to: 'usulan-peserta'
            },
        ],
    },
    {
        title: 'Pengelolaan Akun',
        role: ["admin"],
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-television"></i>,
        content: [
            {
                title: 'Daftar Akun',
                to: 'pengelolaan-akun',
            },
        ],
    },
]