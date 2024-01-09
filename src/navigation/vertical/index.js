const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: '/report.png',
      children:[{
        title:'Analytics',
        path:'/charts/',
      }]
    },
    {
      title: 'Sales',
      icon: '/estate-agent.png',
      children: [
        {
          title: 'Customer Master',
          icon: '/enterprise.png',
          children:[{
            title:'Lead Creation',
            path: '/sales/create-leads/'
          },
          {
            title:'Lead Master',
            path: '/sales/'
          },
          {
            title:'Customer Master',
            path: '/sales/customer-master/'
          }]
        },
        {
          title: 'Sales Order',
          icon: '/estate-agent.png',
          children:[{
            title:'Create Sales Order',
            path: '/sales/sales-orders/add-sales-order'
          },
          {
            title:'Open Sales Order',
            path: '/sales/sales-orders'
          },
          {
            title:'Draft Sales Order',
            path: '/sales/sales-orders/draft'
          }]
        },
        {
          title: 'Invoice',
          icon: '/report.png',
          children:[{
            title:'PendIng-e-Invoice',
            path: '/sales/invoices/pending_invoice'
          },
          {
            title:'E-Invoice Generated',
            path: '/sales/invoices/e-invoice'
          }]
        },
        {
          title: 'Credit Notes',
          icon: '/inventory.png',
          children:[{
            title:'Credit Notes',
            path: '/sales/credit-notes/credit_note'
          },
          {
            title:'Open Credit Notes',
            path: '/sales/credit-notes/credit_note_list'
          }]
        },
      ]
    },
    {
      title: 'Purchase',
      icon: '/report.png',
      children: [
        {
          title: 'Supplier Master',
          children:[{
            title:'Supplier Lead Creation',
            path: ''
          },
          {
            title:'Supplier Master',
            path: ''
          }]
        },
        {
          title: 'Purchase Order',
          children:[{
            title:'Indirect Supplier PO',
            path: ''
          },
          {
            title:'Customer Vendor PO',
            path: ''
          },
          {
            title:'Open Purchase Orders',
            path: ''
          }]
        },
        {
          title: 'Ap Invoice',
          children:[{
            title:'Open A/P Invoices',
            path: ''
          }]
        },
        {
          title: 'Debit Note',
          children:[{
            title:'Customer Vendor DN',
            path: ''
          },
          ]
        },
      ]
    },
    {
      title: 'Inventory',
      icon: '/inventory.png',
      children: [
        {
          title: 'Item Master',
          children:[{
            title:'Item Master List',
            path: ''
          },]
        },
        {
          title: 'Stock List',
          children:[{
            title:'Stock In MaIn Whse',
            path: ''
          },
          {
            title:'Stock In Transit Whse',
            path: ''
          },
          {
            title:'Stock In Replacement Whse',
            path: ''
          }]
        },
        {
          title: 'Inventory Transfer',
          children:[{
            title:'Inventory Transfer Within Branch',
            path: ''
          },
          {
            title:'Inventory Transfer Report',
            path: ''
          },
          ]
        },
      ]
    },
    {
      title: 'Inter Branch',
      icon: '/binocular.png',
      children: [
        {
          title: 'Inventory Transfer',
          children:[{
            title:'Open GRPO/Interbranch',
            path: ''
          },
          {
            title:'Inventory Transfer Within State',
            path: ''
          }]
        },
        {
          title: 'Debit Note',
          children:[{
            title:'Create Debit Note',
            path: ''
          },
          {
            title:'Open Debit Note',
            path: ''
          }]
        },
        {
          title: 'Sales Order',
          path: '/Reports/product-matrix-costIng'
        },
      ]
    },
    {
      title: 'ReportS',
      icon: '/report.png',
      children: [
        {
          title: 'Day Book For Sales',
          path: '/Stocks/Stock-company'
        },
        {
          title: 'Day Book For Purchase',
          path: '/Stocks/Stock-warehouse-wise'
        },
        {
          title: 'Day Book For Credit Note',
          path: '/Reports/product-matrix-costIng'
        },
        {
          title: 'Day Book For Debit Note',
          path: '/Reports/product-matrix-costIng'
        },
        {
          title: 'Bank Statement',
          path: '/Reports/product-matrix-costIng'
        },
        {
          title: 'Customer Aging Report',
          path: '/Reports/product-matrix-costIng'
        },
        {
          title: 'Vendor Aging Report',
          path: '/Reports/product-matrix-costIng'
        },
        {
          title: 'Party Ledger Statement',
          path: '/Reports/product-matrix-costIng'
        },
        {
          title: 'Group Aging',
          path: '/Reports/product-matrix-costIng'
        },
        {
          title: 'Qrcode Report',
          path: '/Reports/product-matrix-costIng'
        },
      ]
    },
    {
      title: 'Banking',
      icon: '/acquisition.png',
      children: [
        {
          title: 'Create Incoming Payment',
          path: '/Stocks/Stock-company'
        },
        {
          title: 'Open Incoming Payment',
          path: '/Stocks/Stock-company'
        },
        {
          title: 'Create Outgoing Payment',
          path: '/Stocks/Stock-warehouse-wise'
        },
        {
          title: 'Open Outgoing Payment',
          path: '/Reports/product-matrix-costIng'
        },
      ]
    },
  ]
}

export default navigation
