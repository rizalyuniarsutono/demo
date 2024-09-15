export const MenuList = [
    //Dashboard
    {
        title: 'Home',	
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
        title:'Checking Calpes',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-notepad"></i>,
        content : [
            {
                title:'Calon Peserta',
                to: 'checking-calon-peserta',
            },
            // {
            //     title:'Verifikasi Pendamping',
            //     to: 'verifikasi-pendamping',
            // },
        ]
    },
    {
        title: 'Aspirasi & Pengaduan',	
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-television"></i>,
        content: [
            {
                title: 'Daftar Aspirasi dan Pengaduan',
                to: 'pengaduan-aspirasi'
            },
            {
                title: 'Form Aspirasi dan Pengaduan',
                to: 'form-pengaduan-aspirasi'
            },
        ],
    },
    {
        title: 'Usulan Pesera',	
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
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-television"></i>,
        content: [
            {
                title: 'Daftar Akun',
                to: 'pengelolaan-akun'
            },
        ],
    },
]