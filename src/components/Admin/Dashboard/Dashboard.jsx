import { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Scissors,
  Package,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  LayoutGrid,
  Activity,
  Briefcase,
  TrendingUp as TrendingUpIcon,
  Filter,
  CalendarRange
} from "lucide-react";
import apiClient from "../../../api/axios";
import RevenueChart from "../Charts/RevenueChart";
import AppointmentTrendsChart from "../Charts/AppointmentTrendsChart";
import ServicePerformanceChart from "../Charts/ServicePerformanceChart";
import ClientDemographicsChart from "../Charts/ClientDemographicsChart";
import DateRangePicker from "./DateRangePicker";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [appointmentTrends, setAppointmentTrends] = useState([]);
  const [servicePerformance, setServicePerformance] = useState([]);
  const [clientDemographics, setClientDemographics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Last 30 days
    endDate: new Date(),
    period: 'monthly' // monthly, quarterly, annual, custom
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'trends', label: 'Trends', icon: TrendingUpIcon },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        period: dateRange.period,
        start_date: dateRange.startDate.toISOString().split('T')[0],
        end_date: dateRange.endDate.toISOString().split('T')[0]
      });

      const [
        statsRes,
        revenueRes,
        trendsRes,
        serviceRes,
        demoRes
      ] = await Promise.all([
        apiClient.get('/dashboard/statistics'),
        apiClient.get(`/dashboard/revenue-chart?${params}`),
        apiClient.get(`/dashboard/appointment-trends?${params}`),
        apiClient.get(`/dashboard/service-performance?${params}`),
        apiClient.get(`/dashboard/client-demographics?${params}`)
      ]);

      setDashboardData(statsRes.data.data);
      setRevenueData(revenueRes.data.data);
      setAppointmentTrends(trendsRes.data.data);
      setServicePerformance(serviceRes.data.data);
      setClientDemographics(demoRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [refreshKey, dateRange.period, dateRange.startDate, dateRange.endDate]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(prev => ({ ...prev, ...newRange }));
  };

  if (loading) {
    return (
      <div className="p-6 bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-200 text-lg">Loading intelligent dashboard...</p>
        </div>
      </div>
    );
  }

  const { overview = {}, clients = {}, services = {}, inventory = {}, growth = {} } = dashboardData || {};

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 border ${color.includes('green') ? 'border-green-700/30' : color.includes('blue') ? 'border-blue-700/30' : 'border-yellow-700/30'} shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/10">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-1">
          {trend === 'up' ? (
            <ArrowUpRight className="w-4 h-4 text-green-300" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-300" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-300' : 'text-red-300'}`}>
            {trendValue}%
          </span>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-white/80 text-sm">{title}</p>
    </div>
  );

  const GrowthIndicator = ({ value }) => {
    const isPositive = value >= 0;
    return (
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${isPositive ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="text-sm font-medium">{Math.abs(value)}%</span>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-neutral-900 min-h-screen">
      {/* Header with Tabs */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-100 mb-2">Intelligent Dashboard</h1>
            <p className="text-yellow-200/70">Real-time insights and analytics for your salon</p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-700/20 text-yellow-200 rounded-lg hover:bg-yellow-700/30 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <DateRangePicker 
              dateRange={dateRange}
              onRangeChange={handleDateRangeChange}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin scrollbar-thumb-yellow-500/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-neutral-800 text-yellow-200/70 hover:bg-neutral-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Today's Appointments"
              value={overview.today_appointments || 0}
              icon={Calendar}
              trend="up"
              trendValue={growth.appointment_growth_rate || 0}
              color="from-blue-900/50 to-blue-800/30"
            />
            <StatCard
              title="Total Revenue"
              value={`₦${(overview.total_revenue || 0).toLocaleString()}`}
              icon={DollarSign}
              trend="up"
              trendValue={growth.revenue_growth_rate || 0}
              color="from-green-900/50 to-emerald-800/30"
            />
            <StatCard
              title="Total Clients"
              value={clients.total_clients || 0}
              icon={Users}
              trend="up"
              trendValue={clients.client_growth_rate || 0}
              color="from-purple-900/50 to-purple-800/30"
            />
            <StatCard
              title="Average Rating"
              value={overview.average_rating || '0.0'}
              icon={Star}
              trend="up"
              trendValue="5"
              color="from-amber-900/50 to-yellow-800/30"
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-5 rounded-2xl border border-red-700/30">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-red-700/30">
                  <Scissors className="w-6 h-6 text-red-300" />
                </div>
                <div>
                  <p className="text-red-300 text-sm">Pending Appointments</p>
                  <p className="text-2xl font-bold text-white">{overview.pending_appointments || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-5 rounded-2xl border border-blue-700/30">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-700/30">
                  <Clock className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-blue-300 text-sm">Confirmed Today</p>
                  <p className="text-2xl font-bold text-white">{overview.confirmed_appointments || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-5 rounded-2xl border border-green-700/30">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-700/30">
                  <TrendingUp className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <p className="text-green-300 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">₦{(overview.monthly_revenue || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 p-5 rounded-2xl border border-amber-700/30">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-700/30">
                  <Package className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <p className="text-amber-300 text-sm">Low Stock Items</p>
                  <p className="text-2xl font-bold text-white">{inventory.low_stock_items || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/30 p-5 rounded-2xl border border-gray-700">
              <h3 className="font-semibold text-gray-200 mb-3">Most Popular Service</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{services.popular_services?.[0]?.service || 'N/A'}</p>
                  <p className="text-gray-400 text-sm">{services.popular_services?.[0]?.count || 0} appointments</p>
                </div>
                <Scissors className="w-10 h-10 text-yellow-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/30 p-5 rounded-2xl border border-gray-700">
              <h3 className="font-semibold text-gray-200 mb-3">Best Time for Appointments</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{clientDemographics?.peak_hours?.[0]?.hour || 'N/A'}</p>
                  <p className="text-gray-400 text-sm">Peak hour with most bookings</p>
                </div>
                <Clock className="w-10 h-10 text-blue-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/30 p-5 rounded-2xl border border-gray-700">
              <h3 className="font-semibold text-gray-200 mb-3">Customer Satisfaction</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{overview.average_rating || '0.0'}/5</p>
                  <p className="text-gray-400 text-sm">Based on {overview.total_reviews || 0} reviews</p>
                </div>
                <Star className="w-10 h-10 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-blue-700/30 shadow-xl">
            <h2 className="text-xl font-bold text-blue-100 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Appointment Trends
            </h2>
            <AppointmentTrendsChart data={appointmentTrends} />
          </div>

          <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-purple-700/30 shadow-xl">
            <h2 className="text-xl font-bold text-purple-100 mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Client Demographics
            </h2>
            <ClientDemographicsChart data={clientDemographics} />
          </div>
        </div>
      )}

      {/* Financial Tab */}
      {activeTab === 'financial' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-green-700/30 shadow-xl">
            <h2 className="text-xl font-bold text-green-100 mb-6 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Revenue vs Profit Trends
            </h2>
            <RevenueChart data={revenueData} period={dateRange.period} />
          </div>

          <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-emerald-700/30 shadow-xl">
            <h2 className="text-xl font-bold text-emerald-100 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Financial Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-900/20 p-5 rounded-xl border border-emerald-700/30">
                <h3 className="text-lg font-semibold text-emerald-200 mb-3">Profit Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Total Profit</span>
                    <span className="text-emerald-100 font-bold">₦{(overview.total_profit || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Profit Margin</span>
                    <span className="text-emerald-100 font-bold">{growth.profit_margin || 0}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Avg. Transaction</span>
                    <span className="text-emerald-100 font-bold">₦{((overview.total_revenue || 0) / (clients.total_clients || 1)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 p-5 rounded-xl border border-blue-700/30">
                <h3 className="text-lg font-semibold text-blue-200 mb-3">Cost Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Service Costs</span>
                    <span className="text-blue-100 font-bold">₦{(services.service_revenue?.[0]?.revenue || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Material Costs</span>
                    <span className="text-blue-100 font-bold">₦{(inventory.total_inventory_value || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Other Costs</span>
                    <span className="text-blue-100 font-bold">₦0</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 p-5 rounded-xl border border-amber-700/30">
                <h3 className="text-lg font-semibold text-amber-200 mb-3">Growth Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-300">Client Growth</span>
                    <GrowthIndicator value={clients.client_growth_rate || 0} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-300">Revenue Growth</span>
                    <GrowthIndicator value={growth.revenue_growth_rate || 0} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-300">Appointment Growth</span>
                    <GrowthIndicator value={growth.appointment_growth_rate || 0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-green-700/30 shadow-xl">
          <h2 className="text-xl font-bold text-green-100 mb-6 flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Service Performance
          </h2>
          <ServicePerformanceChart data={servicePerformance} />
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-blue-700/30 shadow-xl">
            <h2 className="text-xl font-bold text-blue-100 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Historical Trends
            </h2>
            <AppointmentTrendsChart data={appointmentTrends} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-800/50 p-5 rounded-xl border border-gray-700">
              <h3 className="text-gray-300 font-medium mb-2">Growth Rate</h3>
              <div className="text-3xl font-bold text-white">{growth.appointment_growth_rate || 0}%</div>
              <p className="text-sm text-gray-400">vs previous period</p>
            </div>

            <div className="bg-neutral-800/50 p-5 rounded-xl border border-gray-700">
              <h3 className="text-gray-300 font-medium mb-2">Projected Revenue</h3>
              <div className="text-3xl font-bold text-white">₦{(overview.projected_revenue || 0).toLocaleString()}</div>
              <p className="text-sm text-gray-400">Next 30 days</p>
            </div>

            <div className="bg-neutral-800/50 p-5 rounded-xl border border-gray-700">
              <h3 className="text-gray-300 font-medium mb-2">Peak Season</h3>
              <div className="text-3xl font-bold text-white">{clientDemographics?.peak_season || 'N/A'}</div>
              <p className="text-sm text-gray-400">Highest demand period</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}