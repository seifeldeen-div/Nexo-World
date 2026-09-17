import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useLocation } from "react-router-dom"
import "./header.css"
import TopHeader from "./components/TopHeader"
import BottomHeader from "./components/BottomHeader"
import Logo from "../../assets/img/logo.png"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { FaChevronLeft } from "react-icons/fa"

function Header({ collapsed, onToggleCollapsed }) {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia('(max-width: 1050px)').matches
    })

    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [tooltip, setTooltip] = useState(null)
    const location = useLocation()
    const effectiveCollapsed = isMobile ? false : collapsed

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1050px)')
        const handleChange = (e) => setIsMobile(e.matches)
        mq.addEventListener('change', handleChange)
        return () => mq.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        setIsMobileOpen(false)
    }, [location.pathname])

    useEffect(() => {
        setTooltip(null)
    }, [effectiveCollapsed, location.pathname])

    const handleTooltip = (e) => {
        if (!effectiveCollapsed) {
            if (tooltip) setTooltip(null)
            return
        }
        const labelled = e.target.closest?.('[data-label]')
        if (labelled && labelled.closest('.sidebar')) {
            const rect = labelled.getBoundingClientRect()
            setTooltip({ text: labelled.dataset.label, x: rect.right + 12, y: rect.top + rect.height / 2 })
        } else if (tooltip) {
            setTooltip(null)
        }
    }

    return (
        <>
            <div className="mobileTopbar">
                <button
                    className="mobileTopbarBtn"
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={isMobileOpen}
                    onClick={() => setIsMobileOpen(true)}
                >
                    <AiOutlineMenu />
                </button>
                <Link className="mobileTopbarLogo" to="/" aria-label="Nexo home">
                    <img src={Logo} alt="Nexo logo" />
                </Link>
            </div>

            <aside
                className={`sidebar ${effectiveCollapsed ? 'isCollapsed' : ''} ${isMobileOpen ? 'isMobileOpen' : ''}`}
                onMouseOver={handleTooltip}
                onMouseLeave={() => setTooltip(null)}
            >
                <div className="sidebarOverlay" onClick={() => setIsMobileOpen(false)} aria-hidden="true" />

                <div className="sidebarInner">
                    <button
                        className="sidebarCollapse"
                        type="button"
                        aria-label={effectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        onClick={() => onToggleCollapsed?.(!collapsed)}
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        className="sidebarMobileClose"
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <AiOutlineClose />
                    </button>

                    <TopHeader
                        collapsed={effectiveCollapsed}
                        onExpand={() => onToggleCollapsed?.(false)}
                    />

                    <BottomHeader
                        collapsed={effectiveCollapsed}
                        onExpand={() => onToggleCollapsed?.(false)}
                    />
                </div>
            </aside>

            {effectiveCollapsed && tooltip && typeof document !== 'undefined' && createPortal(
                <div className="sidebarTooltip" style={{ left: tooltip.x, top: tooltip.y }} role="tooltip">
                    {tooltip.text}
                </div>,
                document.body
            )}
        </>
    )
}

export default Header