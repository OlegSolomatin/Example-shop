/*
import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
    /!*const url = request.nextUrl
    const { device } = userAgent(request)
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
    return <div>{device.type}</div>*!/
    const hostname = request.headers.get('host')
    const { device } = userAgent(request)

    // If example.com visited from mobile, redirect to m.example.com
    if (hostname === 'localhost' && device.type === 'desktop') {
        const url = request.nextUrl.clone()
        url.hostname = '/login'
        return NextResponse.redirect(url)
    }

    // If m.example.com visited, rewrite to /pages/mobile
    /!*if (hostname === 'm.example.com') {
        const url = request.nextUrl.clone()
        url.pathname = '/mobile' +  url.pathname
        return NextResponse.rewrite(url)
    }*!/

    return NextResponse.next()
}*/
