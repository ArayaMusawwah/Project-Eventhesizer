const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen w-full place-items-center bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
      {children}
    </div>
  )
}
export default Layout
