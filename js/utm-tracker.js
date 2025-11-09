// utm-tracker.js - Sistema de rastreamento de UTMs - Teste de Prosperidade
(function() {
    'use strict';

    // ========================================
    // CAPTURA E PERSISTÊNCIA DE UTMs
    // ========================================
    
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                params[key] = decodeURIComponent(value || '');
            }
        });
        
        return params;
    }
    
    function getOrSetSession(key, defaultValue) {
        let value = sessionStorage.getItem(key);
        if (!value && defaultValue) {
            value = defaultValue;
            sessionStorage.setItem(key, value);
        }
        return value;
    }
    
    // Captura UTMs da URL atual
    const currentQuery = getQueryParams();
    
    const utmSource = currentQuery.utm_source || getOrSetSession('utm_source', null) || 'LpTesteProsperidade';
    const utmMedium = currentQuery.utm_medium || getOrSetSession('utm_medium', null) || '';
    
    sessionStorage.setItem('utm_source', utmSource);
    sessionStorage.setItem('utm_medium', utmMedium);
    
    
    // ========================================
    // FUNÇÃO: ADICIONAR UTMs A URL
    // ========================================
    
    function addUtmsToUrl(baseUrl, utmParams) {
        try {
            const url = new URL(baseUrl);
            
            Object.keys(utmParams).forEach(key => {
                if (!url.searchParams.has(key) && utmParams[key]) {
                    url.searchParams.append(key, utmParams[key]);
                }
            });
            
            if (currentQuery.extra_params && !url.searchParams.has('extra_params')) {
                url.searchParams.append('extra_params', currentQuery.extra_params);
            }
            
            return url.toString();
        } catch (error) {
            console.error('Erro ao processar URL:', error);
            return baseUrl;
        }
    }
    
    
    // ========================================
    // PROCESSA TODOS OS LINKS
    // ========================================
    
    function processLinks() {
        // Checkout: todos os links para mpteste.suellenseragi.com.br
        const checkoutLinks = document.querySelectorAll('a[href*="mpteste.suellenseragi.com.br"]');
        
        checkoutLinks.forEach(link => {
            const baseUrl = link.getAttribute('href');
            
            // Cria utm_campaign baseado no contexto do link
            let utmCampaign = 'TesteProsperidade';
            if (link.closest('.header') || link.classList.contains('cta-header')) {
                utmCampaign = 'LpTeste-header';
            } else if (link.closest('.hero')) {
                utmCampaign = 'LpTeste-hero';
            } else if (link.closest('.self-discovery')) {
                utmCampaign = 'LpTeste-discovery';
            } else if (link.closest('.about-test')) {
                utmCampaign = 'LpTeste-about';
            } else if (link.closest('.video-section')) {
                utmCampaign = 'LpTeste-video';
            } else if (link.closest('.testimonials-section')) {
                utmCampaign = 'LpTeste-testimonials';
            } else if (link.closest('.how-it-works')) {
                utmCampaign = 'LpTeste-howto';
            } else if (link.closest('.final-cta')) {
                utmCampaign = 'LpTeste-cta';
            }
            
            const utmParams = {
                utm_source: sessionStorage.getItem('utm_source') || 'LpTesteProsperidade',
                utm_medium: sessionStorage.getItem('utm_medium') || '',
                utm_campaign: utmCampaign
            };
            
            const finalUrl = addUtmsToUrl(baseUrl, utmParams);
            
            // Atualiza o link no carregamento (mobile)
            link.setAttribute('href', finalUrl);
            
            // Reforça no mouseover (desktop)
            link.addEventListener('mouseenter', function() {
                this.setAttribute('href', finalUrl);
            });
        });
        
        
        // Landing Page: link para suellenseragi.com.br no header
        const headerHomeLinks = document.querySelectorAll('a[href*="suellenseragi.com.br"]:not([href*="mpteste"])');
        
        headerHomeLinks.forEach(link => {
            const baseUrl = link.getAttribute('href');
            
            const utmParams = {
                utm_source: sessionStorage.getItem('utm_source') || 'LpTesteProsperidade',
                utm_medium: sessionStorage.getItem('utm_medium') || ''
            };
            
            const finalUrl = addUtmsToUrl(baseUrl, utmParams);
            
            link.setAttribute('href', finalUrl);
            
            link.addEventListener('mouseenter', function() {
                this.setAttribute('href', finalUrl);
            });
        });
    }
    
    
    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    window.addEventListener('load', () => {
        setTimeout(processLinks, 200);
    });

    
})();
