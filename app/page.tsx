import { Header } from "@/components/header"
import { AppShell } from "@/components/app-shell"
import { BannerCarousel } from "@/components/home/banner-carousel"
import { CategoryGrid } from "@/components/home/category-grid"
import { NearbySection } from "@/components/home/nearby-section"
import { TopRatedSection } from "@/components/home/top-rated-section"
import { PromotionsSection } from "@/components/home/promotions-section"
import { WelcomeCard } from "@/components/home/welcome-card"
import { banners, categories, gyms, promotions } from "@/lib/data"

export default function HomePage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-6 lg:space-y-8">
            {/* Welcome Card - full width */}
            <WelcomeCard />
            
            <BannerCarousel banners={banners} />

            <CategoryGrid categories={categories} />

            <PromotionsSection promotions={promotions} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <NearbySection gyms={gyms} />
              <TopRatedSection gyms={gyms} />
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  )
}
