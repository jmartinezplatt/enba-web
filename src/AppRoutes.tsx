import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Stock from "./pages/Stock";
import Destinos from "./pages/Destinos";
import VeleroDetalle from "./pages/VeleroDetalle";
import DestinoDetalle from "./pages/DestinoDetalle";
import EscuelaNautica from "./pages/EscuelaNautica";
import ServiciosNauticos from "./pages/ServiciosNauticos";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />

    {/* Veleros / Broker */}
    <Route path="/veleros-en-venta" element={<Stock />} />
    <Route path="/veleros-en-venta/:slug" element={<VeleroDetalle />} />
    <Route path="/stock" element={<Navigate to="/veleros-en-venta" replace />} />

    {/* Travesías / Destinos */}
    <Route path="/travesias" element={<Destinos />} />
    <Route path="/travesias/:slug" element={<DestinoDetalle />} />
    <Route path="/destinos" element={<Navigate to="/travesias" replace />} />

    {/* Secciones */}
    <Route path="/escuela-nautica" element={<EscuelaNautica />} />
    <Route path="/servicios-nauticos" element={<ServiciosNauticos />} />
    <Route path="/contacto" element={<Contacto />} />

    {/* Blog */}
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
