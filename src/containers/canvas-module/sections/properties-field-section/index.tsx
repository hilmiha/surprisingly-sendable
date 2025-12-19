const PropertiesFieldSection = ({
    txtLabel,
    children
}:{
    txtLabel:string,
    children:React.ReactNode
}) =>{
    return(
        <div style={{display:'grid', gap:'var(--space-150)', borderBottom:"1px solid var(--clr-surface-3)", paddingBottom:'var(--space-200)'}}>
            <p className="text-sub text-title">{txtLabel}</p>
            <div>
                {children}
            </div>
        </div>
    )
}

export default PropertiesFieldSection