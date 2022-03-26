(function () {
    let _files = document.querySelector('.files'),
        _rMenu = document.getElementById("right-menu"),
        _pMenu = document.querySelector('.menu>ul'),
        fs = null

    const FileUtil = {
        isFolder(f) {
            return !f.type && f.size % 4096 == 0
        }
    },
        FSCMD = {
            CREATE_FOLDER: 'createFoler',
            CRETAE_FILE: 'createFile',
            REFRESH: 'refresh',
            PREVIEW: 'preview',
            PRINT: 'print',
            RENAME: 'rename',
            DOWNLOAD: 'download',
            DELETE: 'delete',
            PROPERTY: 'property'
        },
        rightMenuFactory = {
            cmds: [{
                cmd: FSCMD.CREATE_FOLDER,
                name: '创建文件夹',
                types: [0]
            }, {
                cmd: FSCMD.CRETAE_FILE,
                name: '创建文件',
                types: [0]
            }, {
                cmd: FSCMD.REFRESH,
                name: '刷新',
                types: [0]
            }, {
                cmd: FSCMD.PREVIEW,
                name: '预览',
                types: [1]
            }, {
                cmd: FSCMD.PRINT,
                name: '打印',
                types: [1]
            }, {
                cmd: FSCMD.RENAME,
                name: '重命名',
                types: [1, 2]
            }, {
                cmd: FSCMD.DOWNLOAD,
                name: '下载',
                types: [1]
            }, {
                cmd: FSCMD.DELETE,
                name: '删除',
                types: [1, 2]
            }, {
                cmd: FSCMD.PROPERTY,
                name: '属性',
                types: [1, 2]
            }],
            menuType: {
                Default: 0,
                File: 1,
                Folder: 2
            },
            getMenus(menuType) {
                let cmds = this._getMenuCmds(menuType)
                return this._buildMenus(cmds)
            },
            _getMenuCmds(menuType) {
                return this.cmds.filter(m => m.types.indexOf(menuType) >= 0)
            },
            _buildMenus(cmds) {
                let iHtml = ''
                return '<ul>' + cmds.map(c => `<li data-cmd='${c.cmd}'><a href="javascript:void(0)" data-cmd='${c.cmd}'>${c.name}</a></li>`).join('') + '</ul>'
            }
        },
        pathMenuFactory = {
            buildPathMenu: function (fullPath) {
                let iHtml = ''
                if (fullPath === '/') {
                    iHtml = this.buildPathMenuItem(fullPath, 'root')
                } else {
                    let parr = fullPath.split('/'), tp
                    for (let i = 0; i < parr.length; i++) {
                        if (i === 0) {
                            iHtml += this.buildPathMenuItem('/', 'root')
                        } else {
                            tp = parr.slice(0, i + 1)
                            iHtml += ' > ' + this.buildPathMenuItem(tp.join('/'), parr[i])
                        }
                    }
                }

                return iHtml
            },
            buildPathMenuItem: function (fullPath, name) {
                return `<li><a href="javascript:void(0)" data-fullPath="${fullPath}">${name}</a></li>`
            }
        },
        entryFactory = {

            buildEntries: function (entries) {
                // 文件夹在前
                return entries.sort((e1, e2) => e1.isDirectory ? -1 : 1).map(entry => {
                    return this.buildEntry(entry.fullPath, entry.isFile)
                }).join('')
            },

            buildEntry: function (fullPath, isFile) {
                let name = fullPath.split('/').pop(),
                    id = new Date().getTime()
                return (
                    `<figure data-id='${id}' draggable="false" class="item ellipsis">
                    <img data-id='${id}' draggable="false" class="${isFile ? 'file' : 'folder'}" src="images/${isFile ? 'file' : 'folder'}.png" alt="${name}" data-fullPath='${fullPath}'></img>
                    <p data-id='${id}'class='ellipsis' title='${name}'>${name}</p>
                </figure>`)
            },
            buildNewEntry: function (fullPath, isFile) {
                let div = document.createElement('div')
                div.innerHTML = this.buildEntry(fullPath, isFile)
                let pel = div.firstChild.querySelector('p')
                pel.classList.remove('ellipsis')
                pel.setAttribute('contenteditable', 'true')
                //pel.setAttribute('autofocus', 'autofocus')
                return div.firstChild
            }
        },
        executeStatus = (function (ele) {

            return new (function (el) {
                this._el = el
                this._ls = el.style.cursor || 'default'
                this.executing = () => {
                    setTimeout(() => {
                        this._el.style.cursor = 'progress'
                    }, 0)
                }
                this.executed = () => {
                    setTimeout(() => {
                        this._el.style.cursor = this._ls
                    }, 0)
                }
            })(ele)

        })(_files)


    /*  全局方法：Begin  */
    // 展示目录路径
    const displayPath = function (fullPath) {
        _pMenu.innerHTML = pathMenuFactory.buildPathMenu(fullPath)
    },
        // 展示目录和文件        
        displayEntries = function (entries) {
            _files.innerHTML = entryFactory.buildEntries(entries)
        },

        // 进入某个目录
        entryEntry = async function (fs, fullPath) {
            console.log(`enter ${fullPath}`)
            let start = new Date();
            let dir = await fs.root.getDirectory(fullPath)
            let entries = await dir.getEntries()
            console.log('timing:' + (new Date() - start) / 1000 + 's')
            console.log('')
            displayPath(fullPath)
            displayEntries(entries)
        },

        //获得目录全路径
        getCurrentPath = function () {
            return [..._pMenu.querySelectorAll('li>a')].pop().getAttribute('data-fullpath')
        },

        //获得文件或者文件夹当前最大下标
        getEntrySequence = function () {
            let names = [..._files.querySelectorAll('figure>p')].map(el => el.innerText.trim()),
                fileIndex = -1, folderIndex = -1,
                folderRegex = /新建文件夹（(\d+)）/,
                fileRegex = /新建文件（(\d+)）/, m

            names.forEach(name => {
                if (name === '新建文件夹' && folderIndex < 0) {
                    folderIndex = 0
                } else if (name === '新建文件' && fileIndex < 0) {
                    fileIndex = 0
                } else if ((m = folderRegex.exec(name)) && m.length > 1) {
                    folderIndex = folderIndex > Number.parseInt(m[1]) ? folderIndex : Number.parseInt(m[1])
                } else if ((m = fileRegex.exec(name)) && m.length > 1) {
                    fileIndex = fileIndex > Number.parseInt(m[1]) ? fileIndex : Number.parseInt(m[1])
                }
            })

            return {
                file: fileIndex,
                folder: folderIndex
            }
        },

        setFocus = function (el) {
            el.focus();
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }

    /*  全局方法：End  */


    window.onload = async function () {

        fs = await FileSystem.getInstance()
        var entries = await fs.root.getEntries()
        //展示目录路径
        displayPath(fs.root.fullPath)
        //展示当前目录下的Entry
        displayEntries(entries)

        // 右键菜单
        registerRightMenu(fs)
        // Directory点击
        registerEntryEvents(fs)
        // 路径点击
        registerPathEvents(fs)
        //注册拖拽事件
        registerDragEvents(fs)

        // 如果没有元素，生成默认测试文件夹和文件
        if (_files.querySelectorAll('figure').length <= 0) {
            await fs.root.getDirectory('测试文件夹1')
            await fs.root.getFile('测试文件1')
            entryEntry(fs, fs.root.fullPath)
        }
    };

    // 右键菜单相关事件

    function registerRightMenu(fs) {
        var targetEntryEl, // 右键菜单的触发者
            menuType
        _files.oncontextmenu = function (event) {
            //显示菜单  
            _rMenu.style.display = "block"
            //菜单定位  
            _rMenu.style.left = event.pageX + "px"
            _rMenu.style.top = event.pageY + "px"

            targetEntryEl = event.target,
                menuType = getMenuType(targetEntryEl)

            _rMenu.innerHTML = rightMenuFactory.getMenus(menuType)

            //return false为了屏蔽默认事件  
            event.stopPropagation()
            return false

        };
        //再次点击，菜单消失  
        document.onclick = function () {
            _rMenu.style.display = "none";
        };

        // 文档右键事件
        document.oncontextmenu = (ev) => {
            //如果文件区域禁用鼠标事件
            if (_files.style.pointerEvents === 'none') {
                return false
            }
            _rMenu.style.display = 'none'
        }

        //操作命令点击事件
        _rMenu.addEventListener('click', async ev => {
            let el = ev.target,
                cmd = el.getAttribute('data-cmd'),
                dPath = getCurrentPath(),
                newEntryEl, nameEl,
                entry, isFile, url
            if (cmd) {
                switch (cmd) {
                    case FSCMD.REFRESH: // 刷新
                        entryEntry(fs, dPath)
                        break;
                    case FSCMD.CREATE_FOLDER: // 创建文件夹                  
                    case FSCMD.CRETAE_FILE: // 创建文件
                        isFile = (cmd === FSCMD.CRETAE_FILE)
                        registerCreateNewEntry(fs, dPath, isFile)
                        break
                    case FSCMD.RENAME: //TODO:: 重命名
                        alert('未实现')
                        break;
                    /*
                    if (targetEntryEl && (menuType == rightMenuFactory.menuType.File || menuType == rightMenuFactory.menuType.Folder)) {
                        let nameEl = targetEntryEl.parentElement.querySelector('p')
                        nameEl.setAttribute('contenteditable', 'true')
                        nameEl.focus()
                    }
                    break; */
                    case FSCMD.DELETE: //删除
                        entry = await getEntryFromContext()
                        if (entry) {
                            await entry.remove()
                            entryEntry(fs, getCurrentPath())
                        }
                        break
                    case FSCMD.PROPERTY: // 查看属性
                        entry = await getEntryFromContext()
                        isFile = getEntryTypeFromContext()
                        if (entry && typeof isFile === 'boolean') {
                            let minfo = `name:${entry.name}\nlastModifiedDate:${entry.metadata.lastModifiedDate.toLocaleString()}\nsize:${entry.metadata.size}\n`
                            if (isFile && entry.file) {
                                minfo += `type:${entry.file.type}`
                            }
                            alert(minfo)
                        }
                        break
                    case FSCMD.PREVIEW:
                        entry = await getEntryFromContext()
                        if (entry.isFile) {
                            url = await entry.toURL()
                            window.open(url)
                        }
                        break
                    case FSCMD.PRINT:
                        entry = await getEntryFromContext()
                        if (entry.isFile) {
                            url = await entry.toURL()
                            window.open(`print.html?blob=${encodeURIComponent(url)}`)
                        }
                        break
                    case FSCMD.DOWNLOAD:
                        entry = await getEntryFromContext()
                        url = await entry.toURL()
                        var link = document.createElement('a')
                        link.href = url
                        link.innerText = '下载'
                        link.download = entry.name
                        // link.click() fireFox 失败
                        // document.body.appendChild(link)
                        var e = document.createEvent('MouseEvent');
                        e.initEvent('click', false, false);
                        link.dispatchEvent(e);
                        window.URL.revokeObjectURL(link.href)
                        break
                    default:
                        break
                }
            }
        })

        function registerCreateNewEntry(fs, currentDirPath, isFile) {

            //获得 新建文件序列号
            let sNumber = getEntrySequence(),
                fileIndex = sNumber.file + 1,
                folderIndex = sNumber.folder + 1,
                fname = '新建文件' + (isFile ? (fileIndex === 0 ? '' : `（${fileIndex}）`) : ('夹' + (folderIndex === 0 ? '' : `（${folderIndex}）`))),
                fullPath = currentDirPath + '/' + fname

            newEntryEl = entryFactory.buildNewEntry(fullPath, isFile)
            nameEl = newEntryEl.querySelector('p')
            iconEl = newEntryEl.querySelector('img')
            _files.appendChild(newEntryEl)

            // 文件名           
            setFocus(nameEl)
            nameEl.addEventListener('keydown', ev => {
                if (ev.keyCode === 13) {
                    ev.target.removeEventListener('blur', createEntry)
                    ev.preventDefault()
                    ev.stopPropagation()
                    createEntry(ev)
                }
            })
            nameEl.addEventListener('blur', createEntry)

            async function createEntry(ev) {
                let el = ev.target, newEntry,
                    name = el.innerText.trim(),
                    fullPath = (currentDirPath === '/' ? '' : currentDirPath) + '/' + name,
                    method = isFile ? 'getFile' : 'getDirectory'


                newEntry = await fs.root[method](fullPath, { create: false })
                if (newEntry) {
                    // 目录已已存在
                    alert(`此目标已包含名为"${name}"的文件${isFile ? '' : '夹'}`)
                    let parent = el.parentElement
                    parent.parentElement.removeChild(parent)
                    entryEntry(fs, currentDirPath) // 防止失败，刷新视图 
                }


                newEntry = await fs.root[method](fullPath)
                if (ev.type !== 'blur') {
                    //模拟blur事件
                    el.removeAttribute('contenteditable')
                    var e = document.createEvent('MouseEvent')
                    e.initEvent('blur', false, false)
                    el.dispatchEvent(e)
                }
                entryEntry(fs, currentDirPath)
                return
            }

            //图片
        }

        //获得当前指令类型，File/Folder/Default
        function getMenuType(el) {
            if (el.tagName === 'IMG' && el.classList.contains('folder') && el.src && el.src.indexOf('folder.png') > 0) {
                return rightMenuFactory.menuType.Folder
            } else if (el.tagName === 'IMG' && el.classList.contains('file') && el.src && el.src.indexOf('file.png') > 0) {
                return rightMenuFactory.menuType.File
            }
            return rightMenuFactory.menuType.Default
        }

        // 通过右键菜单上下文获得当前Entry
        function getEntryFromContext() {
            if (targetEntryEl && (menuType == rightMenuFactory.menuType.File || menuType == rightMenuFactory.menuType.Folder)) {
                let fullPath = targetEntryEl.getAttribute('data-fullpath'),
                    isFile = menuType === rightMenuFactory.menuType.File,
                    method = isFile ? 'getFile' : 'getDirectory'
                if (!fullPath) return null
                return fs.root[method](fullPath)
            }
            return null
        }

        function getEntryTypeFromContext() {
            if (targetEntryEl && (menuType == rightMenuFactory.menuType.File || menuType == rightMenuFactory.menuType.Folder)) {
                return menuType === rightMenuFactory.menuType.File
            }
            return null
        }
    }

    // 目录相关事件
    function registerPathEvents(fs) {
        _pMenu.addEventListener('click', (ev) => {
            let el = ev.target, fullPath = el.getAttribute('data-fullPath')
            // 进入特定目录
            if (el.tagName == 'A' && fullPath) {
                entryEntry(fs, fullPath)
            }
        })
    }

    // 注册文件目录点击事件
    function registerEntryEvents(fs) {

        _files.addEventListener('click', (ev) => {
            let el = ev.target, fullPath = el.getAttribute('data-fullPath')
            // 进入深一级目录
            if (el.tagName == 'IMG' && fullPath && el.src.endsWith('folder.png')) {
                entryEntry(fs, fullPath)
            }
        })
    }

    //注册拖拽事件
    function registerDragEvents(fs) {

        _files.addEventListener('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false)

        _files.addEventListener('drop', async function (e) {
            e.stopPropagation();
            e.preventDefault();
            let files = e.dataTransfer.files, file, fileEntry, override
            fullpath = getCurrentPath()
            if (!files || files.length === 0) {
                return
            }
            let currentDir = await fs.root.getDirectory(fullpath)
            for (let i = 0; i < files.length; i++) {
                file = files[i]
                try {
                    if (FileUtil.isFolder(file)) { //文件夹
                        await currentDir.getDirectory(file.name)
                    } else { // 文件

                        // 不存在不创建， 会返回404
                        fileEntry = await currentDir.getFile(file.name, { create: false })

                        if (!fileEntry) {
                            console.log('写入' + file.name + ' size', (file.size / 1024 / 1024).toFixed(2) + 'M')
                            var start = new Date()
                            fileEntry = await currentDir.getFile(file.name, { create: true })
                            await fileEntry.write(file, file.type)
                            console.log('timing:' + (new Date() - start) / 1000 + 's')
                            console.log('')
                            continue
                        }

                        //文件存在,提示覆盖
                        override = window.confirm(`${file.name}已经存在，是否覆盖？`)
                        if (!override) {
                            continue
                        }
                        fileEntry.write(file, file.type)
                    }
                } catch (err) {
                    alert(err.message || '未知错误')
                    break
                }
            }
            entryEntry(fs, fullpath)
        }, false)

    }

})()



