const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'humbleicons:dashboard',
      children: [

        // {
        //   title: 'Calendar',
        //   path: '/opportunity/calendar'
        // },

        // {
        //   title: 'Target Vs Sales',
        //   path: '/dashboard/target-vs-sales'
        // },

        // {
        //   title: 'Collection',
        //   path: '/dashboard/collection'
        // },
        // {
        //   title: 'Outstanding Overdue',
        //   path: '/dashboard/outstanding-overdue'
        // },
        // {
        //   title: 'Sales Order Pending Report',
        //   path: '/dashboard/sales-order-pending-report'
        // },
        // {
        //   title: 'Case Report - Customer Complaint',
        //   path: '/dashboard/case-report-customer-complaint'
        // },
        // {
        //   title: 'New Product Intelligence  ',
        //   path: '/dashboard/new-product-intelligence'
        // },
        // {
        //   title: 'Task Status Report',
        //   path: '/dashboard/task-status-report'
        // {
        //   title: 'Marketing Intelligence Report',
        //   path: '/dashboard/marketing-intelligence-report'
        // },
        // {
        //   title: 'Product Intelligence Report',
        //   path: '/dashboard/product-intelligence-report'
        // },
        // {
        //   title: 'Customer Feedback',
        //   path: '/dashboard/customer-feedback'
        // },
        // {
        //   title: 'New Product Sales',
        //   path: '/dashboard/new-product-sales'
        // },
        // {
        //   title: 'Stock Report',
        //   path: '/dashboard/stock-report'
        // },
        // {
        //   title: 'Product Wise Sales Report',
        //   path: '/dashboard/product-wise-sales-report'
        // },
        // {
        //   title: 'Incentive Report',
        //   path: '/dashboard/incentive-report'
        // },
        // {
        //   title: 'Overdue Commitment Report',
        //   path: '/dashboard/overdue-commitment-report'
        // },
        // {
        //   title: 'Top 10 Selling Product',
        //   path: '/dashboard/top-10-selling-product'
        // },
        // {
        //   title: 'Customer Wise Sales',
        //   path: '/dashboard/customer-wise-sales'
        // },
        // {
        //   title: 'Day Wise Sales',
        //   path: '/dashboard/day-wise-sales'
        // },
        // {
        //   title: 'Lead Pending Report',
        //   path: '/dashboard/lead-pending-report'
        // }

      ]
    },
    {
      title: 'Pivot-Table',
      icon: '/enterprise.png',
      path:'/pivot-table',
    },
    {
      title: 'Full Calendar',
      icon: '/enterprise.png',
      path:'/calendar-view',
    },
    {
      title:"chart",
      path: '/charts/chartjs'
    },
    {
      title: 'Customers',
      icon: '/enterprise.png',
      children: [
        {
          title: 'Leads',
          path: '/customer-master/leads'
        },
        {
          title: 'Customers',
          path: '/customer-master/customers'
        },
      ]
    },
    {
      title: 'Stocks',
      icon: '/inventory.png',
      children: [
        {
          title: 'Stock Company',
          path: '/stocks/stock-company'
        },
        {
          title: 'Stock Warehouse wise',
          path: '/stocks/stock-warehouse-wise'
        },
        {
          title: 'Product Matrix Costing',
          path: '/reports/product-matrix-costing'
        },
      ]
    },
    {
      title: 'Opportunity',
      icon: '/binocular.png',
      children: [
        // {
        //   title: 'Deals',
        //   path: '/opportunity/deals'
        // },

        {
          title: 'Tasks',
          path: '/opportunity/activities'
        },
        {
          title: 'Enquiry',
          path: '/opportunity/enquiry'
        },
        {
          title: 'Sales Tour',
          path: '/opportunity/sales-tour'
        },

        // {
        //   title: 'Service Call',
        //   path: '/opportunity/service-call'
        // }
      ]
    },
    {
      title: 'Sales',
      icon: '/estate-agent.png',
      children: [
        {
          title: 'Sales Quotations',
          path: '/sales/sales-quotation'
        },
        {
          title: 'Sales Orders',
          path: '/sales/sales-order'
        },

        // {
        //   title: 'Sales Invoices',
        //   path: '/sales/sales-invoices'
        // },
        {
          title: 'Sales Target',
          path: '/sales/sales-target'
        },
        {
          title: 'Overdue Commitment',
          path: '/reports/overdue-commitment'
        }
      ]
    },
    {
      title: 'After Sales',
      icon: '/acquisition.png',
      children: [
        {
          title: 'Customer Complaints',
          path: '/service/service-call'
        },
        {
          title: 'Customer Feedback',
          path: '/reports/customer-feedback-non-sale'
        },
        {
          title: 'New Product Feedback',
          path: '/reports/new-product-sample'
        },
        {
          title: 'Marketing Intelligence',
          path: '/reports/market-intelligence'
        }
      ]
    },

    // {
    //   title: 'Inventory',
    //   icon: '/in-stock.png',
    //   children: [
    //     {
    //       title: 'Items',
    //       path: '/inventory/items'
    //     }
    //   ]
    // },

    // {
    //   title: 'Service',
    //   icon: 'carbon:cloud-service-management',
    //   children: [
    // {
    //   title: 'Customer Complaints',
    //   path: '/service/customer-complaints'
    // },
    //     {
    //       title: 'Tour Visit',
    //       path: '/service/tour-visit'
    //     },

    // {
    //   title: 'Sales Tour',
    //   path: '/service/sales-tour'
    // },
    //     {
    //       title: 'Sales Target',
    //       path: '/service/sales-target'
    //     }
    //   ]
    // },
    {
      title: 'Reports',
      icon: '/report.png',
      children: [
        {
          title: 'Top-Selling',
          path: '/reports/top-selling'
        },
        {
          title: 'Non-Selling',
          path: '/reports/non-selling'
        },
        {
          title: 'Non Selling CA',
          path: '/reports/non-selling-ca'
        },
        {
          title: 'Top-Selling CA',
          path: '/reports/top-selling-ca'
        },
        {
          title: 'New Product AW',
          path: '/reports/new-product-aw'
        },
        {
          title: 'Above 30 Days Sales Report',
          path: '/reports/above-30days-sales'
        },

        {
          title: 'Report Analysis',
          path: '/reports/report-analysis'
        },

        {
          title: 'Payment Lead Time',
          path: '/reports/payment-leadtime'
        },
        {
          title: 'Bad Debts',
          path: '/reports/bad-debts'
        },
        {
          title: 'Returns',
          path: '/reports/returns'
        },

        {
          title: 'Customer Ac Confirmation',
          path: '/reports/customer-ac-confirmation'
        },
        {
          title: 'Customer Category List',
          path: '/reports/customer-category-list'
        },

        {
          title: 'Live Status of Product',
          path: '/reports/live-status-of-product'
        },
        {
          title: 'Customer Wise Sales Cycle',
          path: '/reports/customer-wise-sales-cycle'
        },

        // {
        //   title: 'Overdue Commitment',
        //   path: '/reports/overdue-commitment'
        // },
        {
          title: 'Incentive Report',
          path: '/reports/incentive-report'
        },

        {
          title: 'Broadcasting',
          path: '/reports/broadcasting'
        },

        {
          title: 'Customer Approach',
          path: '/reports/customer-approach'
        },

        // {
        //   title: 'Customer Feedback & Non sale',
        //   path: '/reports/customer-feedback-non-sale'
        // },
        // {
        //   title: 'New Product Sample',
        //   path: '/reports/new-product-sample'
        // },

        {
          title: 'Enquiry Report',
          path: '/reports/enquiry-report'
        },
        {
          title: 'Sales Loss',
          path: '/reports/sales-loss'
        },

        // {
        //   title: 'Market Intelligence',
        //   path: '/reports/market-intelligence'
        // },
        {
          title: 'Quality Complaints',
          path: '/reports/quality-complaints'
        },
        {
          title: 'Catalogue Check List',
          path: '/reports/catalogue-check-list'
        },
        {
          title: 'Full Chair Import Grp Sales',
          path: '/reports/full-chair-import-grp-sales'
        },

        // {
        //   title: 'Product Matrix Costing',
        //   path: '/reports/product-matrix-costing'
        // },
        {
          title: 'Product 360',
          path: '/reports/product360'
        },
        {
          title: 'Customer 360',
          path: '/reports/customer360'
        },
        {
          title: 'Agent 360',
          path: '/reports/agent360'
        },
        {
          title: 'Quote Template Formate',
          path: '/reports/quote-template-formate'
        }
      ]
    },
  ]
}

export default navigation
