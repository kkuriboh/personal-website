---
title: 'Reject modern desktop, EMBRACE BSD!'
description: 'Is BSD the BaSeD OS family for desktops? Yes, follow this article and discover why.'
pubDate: 'Jul 22 2022'
heroImage: '/blog/modern_desktop/bsd_hero.webp'
---

## My experience with BSD

The experience I had with the BSD family was very pleasant, although, I couldn't get to install OpenBSD in bare metal(ran fine on QEMU). The minimalism I found in those operating systems was wonderful, combining it with the BSD community and philosophy got me in the heart.

FreeBSD is my OS of choice(would be OpenBSD if could install it), the system has everything I always wanted, security, stability and performance(also there are some BSDs that focus on performance aka DragonflyBSD). FreeBSD's memory management system is incredible, it's like OSX memory management without Apple's bullshit. I could setup almost every tools I use, the only exception was the lspinstaller plugin for neovim which depends on glibc, but that's not a huge problem, I can install my language servers by hand.

<img src="/blog/modern_desktop/beastie.webp" alt="FreeBSD Mascot" />

## Why BSD for desktop users?

Every BSD has it's own peculiarities, but they nicely fit the hole that us developers have when choosing an operating system, that's because they are simple, have good performance and most of the BSD community is made of developers, even the BSD devs daily drive their systems.

Well, what does the community being made out of developers brings to us? EVERYTHING!. In the BSD world we have something called ports, they are literally just software ported from another family of operating systems, which means that, with most of the community being developers, most of the tools we are used to in our workflows are already ported to the BSD repos.

For those who don't believe, most of the BSDs can be considered as "just works" distros, they have the simplest installation methods I've ever seen, their package managers and tools are built on top of the KISS principle(keep it simple, stupid), it's so simple that even a kid could start learning about IT related stuff on a BSD without a tear.

With the above information in mind, we conclude that BSDs are simple to install and use, have all the tools we need, they are super minimalist, it's FOSS, and can still maintain a good performance.

<img src="/blog/modern_desktop/bsd_setup.webp" alt="FreeBSD desktop setup" />

## What about servers? because yes

I'm not the best sysadmin in the world, but I still have my thoughts and opinions on servers. The BSD is widely used for servers and embedded systems, big companies like Netflix make great use of BSDs and there are good reasons for that, most of them were already cited at this post, but here they are again.

BSDs are secure by default, the most known distribution when we talk about security is OpenBSD. OpenBSD is a fork of NetBSD which one of its focuses is being so simple that you can port it to anywhere, with this simplicity, the OpenBSD project built a robust system without bloated modules in the kernel, this created a small and secure operating system perfect for servers, also alongside the OpenBSD project, were created a large amount of tools used in many other operating systems, including the families of Windows, Linux and Mac.

Security is important, but not the main aspect of having a BSD as your server. Those systems have huge performance when compared to other and when talking about performance, the most known distributions are FreeBSD and DragonFlyBSD. FreeBSD has it's own blazingly fast file system(ZFS) while DragonFlyBSD uses a great caching system to gain better performance than the others.

The last, but not the least, BSDs are free as in freedom. No big tech corporations spying on you and what you do on your servers. They also have a huge set of software licenses from the most liberal to some goofy "don't copy my software without making it open source" stuff.

## Final thoughts

BSD is awesome, but it still isn't that mature for all user to consume it. If you are not sure, try it on a virtual machine, you have nothing to lose.

Although you should definitely try to get into the BSD communities and if possible donate to their foundations, it helps a lot.

### Some links

-   [FreeBSD official website](https://www.freebsd.org/)
-   [The FreeBSD foundation](https://freebsdfoundation.org/)
-   [OpenBSD official website](https://www.openbsd.org/)
-   [The OpenBSD foundation](https://www.openbsdfoundation.org/)
-   [DragonFlyBSD official website](https://www.dragonflybsd.org/)
-   [NetBSD official website](https://www.netbsd.org)
